import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetTotalCategorySummaryService } from '@/application/services/financial/get-total-by-category-summary-service'

export class GetTotalCategorySummaryController implements IController {
  private readonly getTotalCategorySummaryService: GetTotalCategorySummaryService

  constructor(getTotalCategorySummaryService: GetTotalCategorySummaryService) {
    this.getTotalCategorySummaryService = getTotalCategorySummaryService
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

    const totalCategorySummary =
      await this.getTotalCategorySummaryService.execute({ slug })

    return {
      statusCode: 200,
      body: { totalCategorySummary },
    }
  }
}
