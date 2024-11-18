import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetTotalExpenseByMonthService } from '@/application/services/financial/get-total-expense-by-month-service'

export class GetTotalExpenseByMonthController implements IController {
  private readonly getTotalExpenseByMonthService: GetTotalExpenseByMonthService

  constructor(getTotalExpenseByMonthService: GetTotalExpenseByMonthService) {
    this.getTotalExpenseByMonthService = getTotalExpenseByMonthService
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

    const totalExpense = await this.getTotalExpenseByMonthService.execute({
      slug,
    })

    return {
      statusCode: 200,
      body: { totalExpense },
    }
  }
}
