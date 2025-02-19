import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { EditUserCondominiumService } from '@/application/services/usercondominium/edit-usercondominium-service'
import { userCondominiumSchema } from '@/application/schemas/IUserCondominium'

export class EditUserCondominiumController implements IController {
  constructor(private editUserCondominiumService: EditUserCondominiumService) {}

  async handle(request: IRequest): Promise<IResponse> {
    const validatedData = userCondominiumSchema.parse(request.body)
    const userCondominium = await this.editUserCondominiumService.execute(
      request.params.id,
      validatedData
    )
    return {
      statusCode: 200,
      body: userCondominium,
    }
  }
}
