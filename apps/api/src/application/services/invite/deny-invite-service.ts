import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { prisma } from '../../libs/prisma'
import { IInvite } from '../../schemas/IInvite'

export class DenyInviteService {
  async execute(token: string): Promise<IInvite> {
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

    return {
      id: deniedInvite.id,
      email: deniedInvite.email,
      token: deniedInvite.token,
      status: deniedInvite.status,
      sent_at: deniedInvite.sent_at,
      expires_at: deniedInvite.expires_at,
      condominium_id: deniedInvite.condominium_id,
      role: deniedInvite.role,
    }
  }
}
