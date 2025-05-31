import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { userCondominiumSchema } from '@/application/schemas/IUserCondominium'
import { CreateUserCondominiumService } from '@/application/services/usercondominium/create-usercondominium-service'

export class CreateUserCondominiumController implements IController {
  constructor(
    private createUserCondominiumService: CreateUserCondominiumService
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    const validatedData = userCondominiumSchema.parse(request.body)
    const userCondominium =
      await this.createUserCondominiumService.execute(validatedData)
    return {
      statusCode: 201,
      body: userCondominium!,
    }
  }
}
