import { randomUUID } from 'node:crypto'

import { BadRequestError } from '@/application/errors/bad-request-error'

import { prisma } from '../../libs/prisma'
import { IUser } from '../../schemas/IUser'
import { IUserCondominium } from '../../schemas/IUserCondominium'

export class CreateUserService {
  async execute(
    data: Omit<IUser, 'id'> & {
      password: string
      condominium: Omit<IUserCondominium, 'id' | 'user_id' | 'joined_at'>
    }
  ): Promise<IUser> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new BadRequestError('user', 'User with this email already exists')
    }

    const role = await prisma.role.findFirst({
      where: { name: data.condominium.role },
    })

    if (!role) {
      throw new BadRequestError('role', 'Role not found')
    }

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        avatar_url: data.avatar_url,
        keycloak_id: randomUUID(),
        condominiums: {
          create: {
            condominium_id: data.condominium.condominium_id,
            role_id: role.id,
            joined_at: new Date(),
          },
        },
      },
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
    }
  }
}
