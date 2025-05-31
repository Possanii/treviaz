import { BadRequestError } from '@/application/errors/bad-request-error'

import { prisma } from '../../libs/prisma'
import { IUserCondominium } from '../../schemas/IUserCondominium'

export class CreateUserCondominiumService {
  async execute(
    data: Omit<IUserCondominium, 'id' | 'user' | 'condominium' | 'joined_at'>
  ): Promise<void> {
    const existingUserCondominium = await prisma.userCondominium.findFirst({
      where: { user_id: data.user_id, condominium_id: data.condominium_id },
    })

    if (existingUserCondominium) {
      throw new BadRequestError(
        'userCondominium',
        'User already belongs to this condominium'
      )
    }

    const role = await prisma.role.findFirst({
      where: { name: data.role },
    })

    if (!role) {
      throw new BadRequestError('role', 'Role not found')
    }

    await prisma.userCondominium.create({
      data: {
        user_id: data.user_id,
        condominium_id: data.condominium_id,
        role_id: role.id,
      },
    })
  }
}
