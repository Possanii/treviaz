import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '../../../libs/prisma'

export class DeleteCondominiumService {
    async execute(id: string): Promise<void> {
        const existingCondominium = await prisma.condominium.findUnique({
            where: { id }
        })

        if (!existingCondominium) {
            throw new NotFoundError('condominium', 'Condominium not found')
        }

        await prisma.condominium.delete({
            where: { id }
        })
    }
}
