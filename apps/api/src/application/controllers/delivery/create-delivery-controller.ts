import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeliverySchema } from '@/application/schemas/IDelivery'
import { CreateDeliveryService } from '@/application/services/delivery/create-delivery-service'
import z from 'zod'

const createDeliverySchema = DeliverySchema.omit({
  id: true,
  status: true,
})

export class CreateDeliveryController implements IController {
  constructor(private createDeliveryService: CreateDeliveryService) {}

  async handle({ body, metadata }: IRequest): Promise<IResponse> {
    const result = createDeliverySchema.safeParse({
      ...body,
      user_id: metadata?.user?.id,
    })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Invalid delivery data.',
        errors
      )
    }

    await this.createDeliveryService.execute(result.data)

    return {
      statusCode: 204,
      body: null,
    }
  }
}
