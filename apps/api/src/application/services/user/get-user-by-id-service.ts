import { ICondominium } from '@treviaz/entities/schemas/ICondominium'
import { IUser } from '@treviaz/entities/schemas/IUser'
import { IUserCondominium } from '@treviaz/entities/schemas/IUserCondominium'

import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '@/application/libs/prisma'

interface IGetUserById {
  user: Omit<IUser, 'keycloak_id'> & {
    created_at: Date
    condominiums: (Pick<IUserCondominium, 'id' | 'role' | 'joined_at'> & {
      condominium: Pick<ICondominium, 'id' | 'name' | 'slug' | 'photo_url'>
    })[]
  }
}

export class GetUserByIdService {
  async execute({
    id,
    slug,
  }: {
    id: string
    slug: string
  }): Promise<IGetUserById> {
    console.log({ slug })

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar_url: true,
        created_at: true,
        condominiums: {
          where: {
            condominium: {
              slug,
            },
          },
          select: {
            id: true,
            role: true,
            joined_at: true,
            condominium: {
              select: {
                id: true,
                name: true,
                slug: true,
                photo_url: true,
              },
            },
          },
        },
      },
    })

    if (!user) {
      throw new NotFoundError('user', 'User was not found')
    }

    return { user }
  }
}
