import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { prisma } from '../../libs/prisma'
import { IInvite } from '../../schemas/IInvite'

export class AcceptInviteService {
    async execute(token: string): Promise<IInvite> {
        const invite = await prisma.invite.findFirst({
            where: { token, status: 'PENDING' },
        })

        if (!invite) {
            throw new UnprocessableEntityError('invite', 'Invite not found or already accepted')
        }

        const now = new Date()
        if (invite.expires_at < now) {
            throw new UnprocessableEntityError('invite', 'Invite has expired')
        }

        const updatedInvite = await prisma.invite.update({
            where: { id: invite.id },
            data: {
                status: 'ACCEPTED',
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
            role: updatedInvite.role,
        }
    }
}
