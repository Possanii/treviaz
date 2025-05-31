import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { condominiumSchema } from '@/application/schemas/ICondominium'
import { EditCondominiumService } from '@/application/services/condominium/edit-condominium-service'

const editCondominiumSchema = condominiumSchema.omit({ id: true }).partial()

export class EditCondominiumController implements IController {
  constructor(private editCondominiumService: EditCondominiumService) {}

  async handle(request: IRequest): Promise<IResponse> {
    const validatedData = editCondominiumSchema.parse(request.body)
    const condominium = await this.editCondominiumService.execute(
      request.params.id,
      validatedData
    )
    return {
      statusCode: 200,
      body: condominium,
    }
  }
}
