import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { prisma } from '../../libs/prisma'

export class DeleteServiceOwnerService {
    async execute(id: string): Promise<void> {
        const serviceOwner = await prisma.serviceOwner.findUnique({
            where: { id }
        })

        if (!serviceOwner) {
            throw new UnprocessableEntityError('serviceOwner', 'Service owner not found')
        }

        await prisma.serviceOwner.delete({
            where: { id }
        })
    }
}
