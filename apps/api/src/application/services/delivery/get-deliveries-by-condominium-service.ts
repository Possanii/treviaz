import { prisma } from '@/application/libs/prisma'
import { IDelivery } from '@/application/schemas/IDelivery'

export class GetDeliveriesByCondominiumService {
  async execute(condominiumId: string): Promise<IDelivery[]> {
    const deliveries = await prisma.delivery.findMany({
      where: { condominium_id: condominiumId },
    })

    return deliveries
  }
}
