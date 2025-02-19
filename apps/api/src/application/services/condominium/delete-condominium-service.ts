import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '../../libs/prisma'
import { ICondominium } from '../../schemas/ICondominium'

export class DeleteCondominiumService {
  async execute(id: string): Promise<void> {
    const existingCondominium = await prisma.condominium.findUnique({
      where: { id },
      include: { address: true },
    })

    if (!existingCondominium) {
      throw new NotFoundError('condominium', 'Condominium not found')
    }

    // Delete the associated address
    await prisma.address.delete({
      where: { id: existingCondominium.address_id },
    })

    // Delete the condominium
    await prisma.condominium.delete({
      where: { id },
    })

    // Delete associated UserCondominium records
    await prisma.userCondominium.deleteMany({
      where: { condominium_id: id },
    })
  }
}
