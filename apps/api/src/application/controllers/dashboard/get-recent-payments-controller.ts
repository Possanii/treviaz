import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetRecentPaymentsService } from '@/application/services/dashboard/get-recent-payments-service'

export class GetRecentPaymentsController implements IController {
  private readonly getRecentPaymentsService: GetRecentPaymentsService

  constructor(getRecentPaymentsService: GetRecentPaymentsService) {
    this.getRecentPaymentsService = getRecentPaymentsService
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

    const recentPayments = await this.getRecentPaymentsService.execute({ slug })

    return {
      statusCode: 200,
      body: { recentPayments },
    }
  }
}
