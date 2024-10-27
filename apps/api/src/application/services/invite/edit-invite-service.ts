import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { prisma } from '../../libs/prisma'
import { IInvite } from '../../schemas/IInvite'

export class EditInviteService {
    async execute(id: string, data: Partial<Omit<IInvite, 'id' | 'email' | 'sent_at'>>): Promise<IInvite> {
        const existingInvite = await prisma.invite.findUnique({
            where: { id }
        })

        if (!existingInvite) {
            throw new UnprocessableEntityError('invite', 'Invite not found')
        }

        const updatedInvite = await prisma.invite.update({
            where: { id },
            data: {
                status: data.status,
                expires_at: data.expires_at,
                condominium_id: data.condominium_id,
                role: data.role,
            }
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
