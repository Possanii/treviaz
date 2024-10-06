
import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '../../../libs/prisma'
import { IUserCondominium } from '../../../schemas/IUserCondominium'

export class DeleteUserCondominiumService {
    async execute(id: string): Promise<void> {
        const existingUserCondominium = await prisma.userCondominium.findUnique({
            where: { id }
        })

        if (!existingUserCondominium) {
            throw new NotFoundError('userCondominium', 'UserCondominium not found')
        }

        // Delete the userCondominium
        await prisma.userCondominium.delete({
            where: { id }
        })
    }
}



