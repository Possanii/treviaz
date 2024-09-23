import { BadRequestError } from '@/application/errors/bad-request-error'
import { prisma } from '../../../libs/prisma'
import { ICondominium } from '../../../schemas/ICondominium'

export class CreateCondominiumService {
    async execute(data: Omit<ICondominium, 'id'>): Promise<ICondominium> {
        const existingCondominium = await prisma.condominium.findFirst({
            where: { name: data.name }
        })

        if (existingCondominium) {
            throw new BadRequestError('condominium', 'Condominium with this name already exists')
        }

        const condominium = await prisma.condominium.create({
            data: {
                name: data.name,
                address: data.address,
                photo_url: data.photo_url,
                owner_id: data.owner_id
            }
        })

        return {
            id: condominium.id,
            name: condominium.name,
            address: condominium.address,
            photo_url: condominium.photo_url ?? undefined,
            owner_id: condominium.owner_id
        }
    }
}
