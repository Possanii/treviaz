import slugify from 'slugify'

import { BadRequestError } from '@/application/errors/bad-request-error'
import { IAddress } from '@/application/schemas/IAddress'

import { prisma } from '../../libs/prisma'
import { ICondominium } from '../../schemas/ICondominium'

export class CreateCondominiumService {
  async execute(
    data: Omit<
      ICondominium,
      'id' | 'slug' | 'created_at' | 'updated_at' | 'address_id' | 'address'
    > & { address: Omit<IAddress, 'id'> }
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

    await prisma.$transaction(async (tx) => {
      const condominium = await tx.condominium.create({
        data: {
          name: data.name,
          slug: slugify(data.name, {
            lower: true,
          }),
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
          owner: {
            connect: {
              id: data.owner_id,
            },
          },
        },
      })

      await tx.userCondominium.create({
        data: {
          condominium_id: condominium.id,
          role: 'ADMIN',
          user_id: data.owner_id,
        },
      })
    })
  }
}
