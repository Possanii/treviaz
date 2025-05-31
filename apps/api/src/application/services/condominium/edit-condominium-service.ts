/* eslint-disable camelcase */
import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'

import { prisma } from '../../libs/prisma'
import { IAddress } from '../../schemas/IAddress'
import { ICondominium } from '../../schemas/ICondominium'

export class EditCondominiumService {
  async execute(
    id: string,
    data: Partial<
      Omit<ICondominium, 'id' | 'created_at' | 'updated_at' | 'address_id'>
    >
  ): Promise<ICondominium> {
    const existingCondominium = await prisma.condominium.findUnique({
      where: { id },
      include: { address: true },
    })

    if (!existingCondominium) {
      throw new UnprocessableEntityError('condominium', 'Condominium not found')
    }

    const { address, owner_id, ...condominiumData } = data

    const updateData: any = {
      ...condominiumData,
      updated_at: new Date(),
    }

    if (address) {
      updateData.address = {
        update: this.formatAddressData(address),
      }
    }

    // Handle owner_id change if provided
    if (owner_id) {
      // Get admin role
      const adminRole = await prisma.role.findFirst({
        where: { name: 'ADMIN' },
      })

      if (!adminRole) {
        throw new UnprocessableEntityError('role', 'Admin role not found')
      }

      // Find current admin
      const currentAdmin = await prisma.userCondominium.findFirst({
        where: {
          condominium_id: id,
          role: {
            name: 'ADMIN',
          },
        },
      })

      // Update admin if different
      if (currentAdmin && currentAdmin.user_id !== owner_id) {
        await prisma.userCondominium.update({
          where: { id: currentAdmin.id },
          data: { user_id: owner_id },
        })
      } else if (!currentAdmin) {
        // Create new admin relationship if none exists
        await prisma.userCondominium.create({
          data: {
            condominium_id: id,
            user_id: owner_id,
            role_id: adminRole.id,
          },
        })
      }
    }

    const updatedCondominium = await prisma.condominium.update({
      where: { id },
      data: updateData,
      include: { address: true },
    })

    // Get the admin user for this condominium
    const admin = await prisma.userCondominium.findFirst({
      where: {
        condominium_id: id,
        role: {
          name: 'ADMIN',
        },
      },
      include: {
        user: true,
      },
    })

    return this.formatCondominiumResponse(updatedCondominium, admin?.user_id)
  }

  private formatAddressData(address: Partial<IAddress>) {
    return {
      street: address.street,
      number: address.number,
      complement: address.complement,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      country: address.country,
      zip_code: address.zip_code,
    }
  }

  private formatCondominiumResponse(
    condominium: any,
    ownerId?: string
  ): ICondominium {
    return {
      id: condominium.id,
      name: condominium.name,
      slug: condominium.slug,
      address: condominium.address,
      address_id: condominium.address_id,
      photo_url: condominium.photo_url ?? undefined,
      owner_id: ownerId ?? '',
      created_at: condominium.created_at,
      updated_at: condominium.updated_at,
    }
  }
}
