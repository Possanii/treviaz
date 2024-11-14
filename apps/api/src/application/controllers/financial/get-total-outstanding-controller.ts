import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetTotalOutstandingService } from '@/application/services/financial/get-total-outstanding-service'

export class GetTotalOutstandingController implements IController {
  private readonly getTotalOutstandingService: GetTotalOutstandingService

  constructor(getTotalOutstandingService: GetTotalOutstandingService) {
    this.getTotalOutstandingService = getTotalOutstandingService
  }

  async handle(request: IRequest): Promise<IResponse> {
    const totalOutstanding = await this.getTotalOutstandingService.execute()

    return {
      statusCode: 200,
      body: { totalOutstanding },
    }
  }
}
