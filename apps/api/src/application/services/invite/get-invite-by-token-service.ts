import { ICondominium } from '@treviaz/entities/schemas/ICondominium'
import { IInvite } from '@treviaz/entities/schemas/IInvite'
import { IUser } from '@treviaz/entities/schemas/IUser'

import { NotFoundError } from '@/application/errors/not-found-error'

import { prisma } from '../../libs/prisma'

export class GetInviteByTokenService {
  async execute(token: string): Promise<{
    invite: Pick<
      IInvite,
      'id' | 'email' | 'role' | 'sent_at' | 'expires_at'
    > & { author: Pick<IUser, 'id' | 'name' | 'avatar_url'> } & {
      condominium: Pick<ICondominium, 'id' | 'name' | 'photo_url'>
    }
  }> {
    const invite = await prisma.invite.findFirst({
      where: { token, status: 'PENDING' },
      select: {
        id: true,
        email: true,
        role: true,
        sent_at: true,
        expires_at: true,
        author: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
        condominium: {
          select: {
            id: true,
            name: true,
            photo_url: true,
          },
        },
      },
    })

    if (!invite) {
      throw new NotFoundError('invite', 'Invite not found or already accepted')
    }

    const now = new Date()
    if (invite.expires_at < now) {
      throw new NotFoundError('invite', 'Invite has expired')
    }

    return { invite }
  }
}