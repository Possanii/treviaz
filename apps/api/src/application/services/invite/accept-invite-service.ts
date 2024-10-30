import { IInvite } from '@treviaz/entities/schemas/IInvite'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'

import { prisma } from '../../libs/prisma'

export class AcceptInviteService {
  async execute(token: string): Promise<IInvite> {
    const invite = await prisma.invite.findFirst({
      where: { token, status: 'PENDING' },
    })

    if (!invite) {
      throw new UnprocessableEntityError(
        'invite',
        'Invite not found or already accepted'
      )
    }

    const now = new Date()
    if (invite.expires_at < now) {
      throw new UnprocessableEntityError('invite', 'Invite has expired')
    }

    await prisma.invite.update({
      where: { id: invite.id },
      data: {
        status: 'ACCEPTED',
      },
    })

    return invite
  }
}
