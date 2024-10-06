import { BadRequestError } from '@/application/errors/bad-request-error'
import { prisma } from '../../../libs/prisma'
import { IUserCondominium } from '../../../schemas/IUserCondominium'

export class CreateUserCondominiumService {
    async execute(data: Omit<IUserCondominium, 'id' | 'joined_at'>): Promise<IUserCondominium> {
        const existingUserCondominium = await prisma.userCondominium.findFirst({
            where: { user_id: data.user_id, condominium_id: data.condominium_id }
        })

        if (existingUserCondominium) {
            throw new BadRequestError('userCondominium', 'User already belongs to this condominium')
        }

        const userCondominium = await prisma.userCondominium.create({
            data: {
                user_id: data.user_id,
                condominium_id: data.condominium_id,
                role: data.role
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
