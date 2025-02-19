import z from 'zod'

import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteServiceOwnerService } from '@/application/services/serviceowner/delete-serviceowner-service'
import { serviceOwnerSchema } from '@/application/schemas/IServiceOwner'

const deleteServiceOwnerSchema = z.object({
  id: serviceOwnerSchema.shape.id,
})

export class DeleteServiceOwnerController implements IController {
  constructor(private deleteServiceOwnerService: DeleteServiceOwnerService) {}

  async handle(request: IRequest): Promise<IResponse> {
    const validatedData = deleteServiceOwnerSchema.parse(request.params)
    await this.deleteServiceOwnerService.execute(validatedData.id)
    return {
      statusCode: 204,
      body: null,
    }
  }
}
