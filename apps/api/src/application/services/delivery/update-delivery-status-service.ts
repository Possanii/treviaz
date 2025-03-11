import { prisma } from '@/application/libs/prisma'
import { DeliveryStatus } from '@prisma/client'

export class UpdateDeliveryStatusService {
  async execute(id: string, status: DeliveryStatus) {
    const delivery = await prisma.delivery.update({
      where: { id },
      data: { status },
    })

    return delivery
  }
}