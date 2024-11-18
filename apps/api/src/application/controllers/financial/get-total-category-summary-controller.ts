import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetTotalCategorySummaryService } from '@/application/services/financial/get-total-by-category-summary-service'

export class GetTotalCategorySummaryController implements IController {
  private readonly getTotalCategorySummaryService: GetTotalCategorySummaryService

  constructor(getTotalCategorySummaryService: GetTotalCategorySummaryService) {
    this.getTotalCategorySummaryService = getTotalCategorySummaryService
  }

  async handle(request: IRequest): Promise<IResponse> {
    const totalCategorySummary =
      await this.getTotalCategorySummaryService.execute()

    return {
      statusCode: 200,
      body: { totalCategorySummary },
    }
  }
}
