import { IRoleEnum } from '@treviaz/entities/schemas/IRole'

import { BadRequestError } from '@/application/errors/bad-request-error'
import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'

import { prisma } from '../../libs/prisma'
import { IInvite } from '../../schemas/IInvite'

export class DenyInviteService {
  async execute(token: string): Promise<Omit<IInvite, 'author_id'>> {
    const invite = await prisma.invite.findFirst({
      where: { token, status: 'PENDING' },
    })

    if (!invite) {
      throw new UnprocessableEntityError(
        'invite',
        'Invite not found or already processed'
      )
    }

    const deniedInvite = await prisma.invite.update({
      where: { id: invite.id },
      data: {
        status: 'DENIED',
      },
    })

    const role = await prisma.role.findUnique({
      where: { id: deniedInvite.role_id },
    })

    if (!role) {
      throw new BadRequestError('role', 'Role not found')
    }

    return {
      id: deniedInvite.id,
      email: deniedInvite.email,
      token: deniedInvite.token,
      status: deniedInvite.status,
      sent_at: deniedInvite.sent_at,
      expires_at: deniedInvite.expires_at,
      condominium_id: deniedInvite.condominium_id,
      role: role.name as IRoleEnum,
    }
  }
}
