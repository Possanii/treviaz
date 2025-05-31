import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'

import { prisma } from '../../libs/prisma'
import { IUserCondominium } from '../../schemas/IUserCondominium'

export class EditUserCondominiumService {
  async execute(
    id: string,
    data: Partial<Omit<IUserCondominium, 'id' | 'joined_at'>>
  ): Promise<Omit<IUserCondominium, 'user' | 'condominium'>> {
    const existingUserCondominium = await prisma.userCondominium.findUnique({
      where: { id },
    })

    if (!existingUserCondominium) {
      throw new UnprocessableEntityError(
        'userCondominium',
        'UserCondominium not found'
      )
    }

    const role = await prisma.role.findFirst({
      where: { name: data.role },
    })

    if (!role) {
      throw new UnprocessableEntityError('role', 'Role not found')
    }

    const userCondominium = await prisma.userCondominium.update({
      where: { id },
      data: {
        ...(data.user_id !== undefined && { user_id: data.user_id }),
        ...(data.condominium_id !== undefined && {
          condominium_id: data.condominium_id,
        }),
        ...(role !== undefined && { role_id: role.id }),
      },
    })

    return {
      id: userCondominium.id,
      user_id: userCondominium.user_id,
      condominium_id: userCondominium.condominium_id,
      role: role.name as IUserCondominium['role'],
      joined_at: userCondominium.joined_at,
    }
  }
}
