import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { prisma } from '../../libs/prisma'

export class DeleteUserService {
    async execute(id: string): Promise<void> {
        const user = await prisma.user.findUnique({
            where: { id }
        })

        if (!user) {
            throw new UnprocessableEntityError('user', 'User not found')
        }


        await prisma.userCondominium.deleteMany({
            where: { user_id: id }
        })

    
        await prisma.user.delete({
            where: { id }
        })
    }
}
