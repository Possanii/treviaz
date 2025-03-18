import { DeliveryStatus } from '@prisma/client'
import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeliverySchema } from '@/application/schemas/IDelivery'
import { UpdateDeliveryStatusService } from '@/application/services/delivery/update-delivery-status-service'

const updateDeliveryStatusSchema = z.object({
  id: DeliverySchema.shape.id,
  status: z.nativeEnum(DeliveryStatus),
})

export class UpdateDeliveryStatusController implements IController {
  constructor(
    private readonly updateDeliveryStatusService: UpdateDeliveryStatusService
  ) {}

  async handle({ params, body }: IRequest): Promise<IResponse> {
    const result = updateDeliveryStatusSchema.safeParse({
      id: params.id,
      status: body.status,
    })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Invalid delivery data.',
        errors
      )
    }

    const { id, status } = result.data

    await this.updateDeliveryStatusService.execute(id, status)

    return {
      statusCode: 204,
      body: null,
    }
  }
}
