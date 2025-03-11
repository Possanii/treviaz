import { prisma } from '@/application/libs/prisma'
import { IDelivery } from '@/application/schemas/IDelivery'

export class GetDeliveriesByCondominiumService {
  async execute(condominiumSlug: string): Promise<IDelivery[]> {
    const deliveries = await prisma.delivery.findMany({
      where: {
        condominium: {
          slug: condominiumSlug,
        },
      },
      include: {
        condominium: true,
        user: true,
      },
    })

    return deliveries
  }
}
