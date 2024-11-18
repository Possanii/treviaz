import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetTotalIncomeByMonthService } from '@/application/services/financial/get-total-income-by-month-service'

export class GetTotalIncomeByMonthController implements IController {
  private readonly getTotalIncomeByMonthService: GetTotalIncomeByMonthService

  constructor(getTotalIncomeByMonthService: GetTotalIncomeByMonthService) {
    this.getTotalIncomeByMonthService = getTotalIncomeByMonthService
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

    const totalIncome = await this.getTotalIncomeByMonthService.execute({
      slug,
    })

    return {
      statusCode: 200,
      body: { totalIncome },
    }
  }
}
