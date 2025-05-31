import { DeliveryStatus } from '@prisma/client'

import { prisma } from '@/application/libs/prisma'

export class UpdateDeliveryStatusService {
  async execute(id: string, status: DeliveryStatus) {
    const delivery = await prisma.delivery.update({
      where: { id },
      data: { status },
    })

    return delivery
  }
}
