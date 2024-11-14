import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetTotalIncomeByMonthService } from '@/application/services/financial/get-total-income-by-month-service'

export class GetTotalIncomeByMonthController implements IController {
  private readonly getTotalIncomeByMonthService: GetTotalIncomeByMonthService

  constructor(getTotalIncomeByMonthService: GetTotalIncomeByMonthService) {
    this.getTotalIncomeByMonthService = getTotalIncomeByMonthService
  }

  async handle(request: IRequest): Promise<IResponse> {
    const totalIncome = await this.getTotalIncomeByMonthService.execute()

    return {
      statusCode: 200,
      body: { totalIncome },
    }
  }
}
