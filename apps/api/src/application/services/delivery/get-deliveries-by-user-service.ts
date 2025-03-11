import { prisma } from '@/application/libs/prisma'
import { IDelivery } from '@/application/schemas/IDelivery'
export class GetDeliveriesByUserService {
  async execute(userId: string): Promise<IDelivery[]> {
    const deliveries = await prisma.delivery.findMany({
      where: { user_id: userId },
    })

    return deliveries
  }
}
