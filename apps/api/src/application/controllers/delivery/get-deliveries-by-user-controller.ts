import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetDeliveriesByUserService } from '@/application/services/delivery/get-deliveries-by-user-service'

export class GetDeliveriesByUserController implements IController {
  constructor(private getDeliveriesByUserService: GetDeliveriesByUserService) {}

  async handle({ metadata }: IRequest): Promise<IResponse> {
    const userId = metadata?.user?.id

    if (!userId) {
      return {
        statusCode: 401,
        body: { message: 'Unauthorized' },
      }
    }

    const deliveries = await this.getDeliveriesByUserService.execute(userId)

    return {
      statusCode: 200,
      body: { deliveries },
    }
  }
}
