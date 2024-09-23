import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '../../../libs/prisma'
import { ICondominium } from '../../../schemas/ICondominium'

export class EditCondominiumService {
    async execute(id: string, data: Partial<Omit<ICondominium, 'id'>>): Promise<ICondominium> {
        const existingCondominium = await prisma.condominium.findUnique({
            where: { id }
        })

        if (!existingCondominium) {
            throw new NotFoundError('condominium', 'Condominium not found')
        }

        const updatedCondominium = await prisma.condominium.update({
            where: { id },
            data
        })

        return {
            id: updatedCondominium.id,
            name: updatedCondominium.name,
            address: updatedCondominium.address,
            photo_url: updatedCondominium.photo_url ?? undefined,
            owner_id: updatedCondominium.owner_id
        }
    }
}
