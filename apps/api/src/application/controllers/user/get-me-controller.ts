import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetMeService } from '@/application/services/user/get-me-service'

export class GetMeController implements IController {
  private readonly getMeService: GetMeService

  constructor(getMeService: GetMeService) {
    this.getMeService = getMeService
  }

  async handle({ metadata }: IRequest): Promise<IResponse> {
    const user = await this.getMeService.execute({
      id: metadata!.user!.id,
    })

    return {
      statusCode: 200,
      body: { user },
    }
  }
}
