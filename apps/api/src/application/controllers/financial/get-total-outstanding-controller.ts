import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetTotalOutstandingService } from '@/application/services/financial/get-total-outstanding-service'

export class GetTotalOutstandingController implements IController {
  private readonly getTotalOutstandingService: GetTotalOutstandingService

  constructor(getTotalOutstandingService: GetTotalOutstandingService) {
    this.getTotalOutstandingService = getTotalOutstandingService
  }

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = condominiumSchema.pick({ slug: true }).safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'condominium',
        'Invalid condominium slug',
        errors
      )
    }

    const { slug } = result.data

    const totalOutstanding = await this.getTotalOutstandingService.execute({
      slug,
    })

    return {
      statusCode: 200,
      body: { totalOutstanding },
    }
  }
}
