import { prisma } from '@/application/libs/prisma'
import { IDelivery } from '@/application/schemas/IDelivery'

export class GetAllDeliveriesService {
  async execute(): Promise<IDelivery[]> {
    const deliveries = await prisma.delivery.findMany({
      include: {
        user: true,
        condominium: true,
      },
    })
    return deliveries
  }
}
