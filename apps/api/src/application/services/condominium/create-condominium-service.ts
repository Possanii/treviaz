import { ICondominium } from '@treviaz/entities/schemas/ICondominium'

import { BadRequestError } from '@/application/errors/bad-request-error'
import { IAddress } from '@/application/schemas/IAddress'
import { createSlug } from '@/application/utils/create-slug'

import { prisma } from '../../libs/prisma'

export class CreateCondominiumService {
  async execute(
    data: Omit<
      ICondominium,
      'id' | 'slug' | 'created_at' | 'updated_at' | 'address_id' | 'address'
    > & { 
      address: Omit<IAddress, 'id'>,
      owner_id: string // Keep this parameter for backward compatibility
    }
  ): Promise<void> {
    const existingCondominium = await prisma.condominium.findFirst({
      where: { name: data.name },
    })

    if (existingCondominium) {
      throw new BadRequestError(
        'condominium',
        'Condominium with this name already exists'
      )
    }

    // Get the admin role
    const adminRole = await prisma.role.findFirst({
      where: { name: 'ADMIN' }
    })

    if (!adminRole) {
      throw new BadRequestError('role', 'Admin role not found')
    }

    await prisma.$transaction(async (tx) => {
      const condominium = await tx.condominium.create({
        data: {
          name: data.name,
          slug: createSlug(data.name),
          address: {
            create: {
              street: data.address.street,
              number: data.address.number,
              complement: data.address.complement,
              neighborhood: data.address.neighborhood,
              city: data.address.city,
              state: data.address.state,
              country: data.address.country,
              zip_code: data.address.zip_code,
            },
          },
          photo_url: data.photo_url,
          // Remove owner connection
        },
      })

      await tx.userCondominium.create({
        data: {
          condominium_id: condominium.id,
          role_id: adminRole.id, // Use role_id instead of role enum
          user_id: data.owner_id,
        },
      })
    })
  }
}
