import { IRoleEnum } from '@treviaz/entities/schemas/IRole'

import { BadRequestError } from '@/application/errors/bad-request-error'
import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'

import { prisma } from '../../libs/prisma'
import { IInvite } from '../../schemas/IInvite'

export class RevokeInviteService {
  async execute(id: string): Promise<Omit<IInvite, 'author_id'>> {
    const existingInvite = await prisma.invite.findUnique({
      where: { id },
    })

    if (!existingInvite) {
      throw new UnprocessableEntityError('invite', 'Invite not found')
    }

    const revokedInvite = await prisma.invite.update({
      where: { id },
      data: {
        status: 'REVOKED',
      },
    })

    const role = await prisma.role.findUnique({
      where: { id: revokedInvite.role_id },
    })

    if (!role) {
      throw new BadRequestError('role', 'Role not found')
    }

    return {
      id: revokedInvite.id,
      email: revokedInvite.email,
      token: revokedInvite.token,
      status: revokedInvite.status,
      sent_at: revokedInvite.sent_at,
      expires_at: revokedInvite.expires_at,
      condominium_id: revokedInvite.condominium_id,
      role: role.name as IRoleEnum,
    }
  }
}
