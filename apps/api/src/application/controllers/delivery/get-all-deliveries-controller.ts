import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetAllDeliveriesService } from '@/application/services/delivery/get-all-deliveries-service'

export class GetAllDeliveriesController implements IController {
  constructor(private getAllDeliveriesService: GetAllDeliveriesService) {}

  async handle(_: IRequest): Promise<IResponse> {
    const deliveries = await this.getAllDeliveriesService.execute()

    return {
      statusCode: 200,
      body: { deliveries },
    }
  }
}
