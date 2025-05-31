import { IRoleEnum } from '@treviaz/entities/schemas/IRole'

import { BadRequestError } from '@/application/errors/bad-request-error'
import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'

import { prisma } from '../../libs/prisma'
import { IInvite } from '../../schemas/IInvite'

export class EditInviteService {
  async execute(
    id: string,
    data: Partial<Omit<IInvite, 'id' | 'email' | 'sent_at'>>
  ): Promise<Omit<IInvite, 'author_id'>> {
    const existingInvite = await prisma.invite.findUnique({
      where: { id },
    })

    if (!existingInvite) {
      throw new UnprocessableEntityError('invite', 'Invite not found')
    }

    const role = await prisma.role.findFirst({
      where: { name: data.role },
    })

    if (!role) {
      throw new BadRequestError('role', 'Role not found')
    }

    const updatedInvite = await prisma.invite.update({
      where: { id },
      data: {
        status: data.status,
        expires_at: data.expires_at,
        condominium_id: data.condominium_id,
        role_id: role.id,
      },
    })

    return {
      id: updatedInvite.id,
      email: updatedInvite.email,
      token: updatedInvite.token,
      status: updatedInvite.status,
      sent_at: updatedInvite.sent_at,
      expires_at: updatedInvite.expires_at,
      condominium_id: updatedInvite.condominium_id,
      role: role.name as IRoleEnum,
    }
  }
}
