import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { prisma } from '../../../libs/prisma'
import { IUserCondominium } from '../../../schemas/IUserCondominium'
import { IAddress } from '../../../schemas/IAddress'

export class EditUserCondominiumService {
    async execute(id: string, data: Partial<Omit<IUserCondominium, 'id' | 'joined_at'>>): Promise<IUserCondominium> {
        const existingUserCondominium = await prisma.userCondominium.findUnique({
            where: { id }
        })

        if (!existingUserCondominium) {
            throw new UnprocessableEntityError('userCondominium', 'UserCondominium not found')
        }

        const userCondominium = await prisma.userCondominium.update({
            where: { id },
            data: {
                ...data,
            }
        })

        return {
            id: userCondominium.id,
            user_id: userCondominium.user_id,
            condominium_id: userCondominium.condominium_id,
            role: userCondominium.role,
            joined_at: userCondominium.joined_at
        }
    }
}

