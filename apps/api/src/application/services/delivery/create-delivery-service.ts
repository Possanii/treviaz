import { prisma } from '@/application/libs/prisma'
import { IDelivery } from '@/application/schemas/IDelivery'

export class CreateDeliveryService {
  async execute(data: Omit<IDelivery, 'id' | 'status'>) {
    const delivery = await prisma.delivery.create({ data })

    return delivery
  }
}