import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetTotalExpenseByMonthService } from '@/application/services/financial/get-total-expense-by-month-service'

export class GetTotalExpenseByMonthController implements IController {
  private readonly getTotalExpenseByMonthService: GetTotalExpenseByMonthService

  constructor(getTotalExpenseByMonthService: GetTotalExpenseByMonthService) {
    this.getTotalExpenseByMonthService = getTotalExpenseByMonthService
  }

  async handle(request: IRequest): Promise<IResponse> {
    const totalExpense = await this.getTotalExpenseByMonthService.execute()

    return {
      statusCode: 200,
      body: { totalExpense },
    }
  }
}
