import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { prisma } from '../../libs/prisma'
import { IInvite } from '../../schemas/IInvite'

export class RevokeInviteService {
    async execute(id: string): Promise<IInvite> {
        const existingInvite = await prisma.invite.findUnique({
            where: { id }
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

        return {
            id: revokedInvite.id,
            email: revokedInvite.email,
            token: revokedInvite.token,
            status: revokedInvite.status,
            sent_at: revokedInvite.sent_at,
            expires_at: revokedInvite.expires_at,
            condominium_id: revokedInvite.condominium_id,
            role: revokedInvite.role,
        }
    }
}
