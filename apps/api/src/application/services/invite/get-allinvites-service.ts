import { prisma } from '../../libs/prisma'
import { IInvite } from '../../schemas/IInvite'

export class GetAllInvitesService {
    async execute(): Promise<IInvite[]> {
        const invites = await prisma.invite.findMany({
            select: {
                id: true,
                email: true,
                token: true,
                status: true,
                sent_at: true,
                expires_at: true,
            },
        })

        return invites
    }
}
