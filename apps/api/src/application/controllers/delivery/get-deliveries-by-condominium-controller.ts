import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetDeliveriesByCondominiumService } from '@/application/services/delivery/get-deliveries-by-condominium-service'

const getDeliveriesByCondominiumSchema = z.object({
  condominiumSlug: z.string(),
})

export class GetDeliveriesByCondominiumController implements IController {
  constructor(
    private getDeliveriesByCondominiumService: GetDeliveriesByCondominiumService
  ) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = getDeliveriesByCondominiumSchema.safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Invalid condominium id.',
        errors
      )
    }

    const deliveries = await this.getDeliveriesByCondominiumService.execute(
      result.data.condominiumSlug
    )

    return {
      statusCode: 200,
      body: { deliveries },
    }
  }
}
