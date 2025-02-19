import z from 'zod'

import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { EditServiceOwnerService } from '@/application/services/serviceowner/edit-serviceowner-service'

import { serviceOwnerSchema } from '@/application/schemas/IServiceOwner'

const editServiceOwnerSchema = serviceOwnerSchema.omit({ id: true }).extend({
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .optional(),
})

export class EditServiceOwnerController implements IController {
  constructor(private editServiceOwnerService: EditServiceOwnerService) {}

  async handle(request: IRequest): Promise<IResponse> {
    const validatedData = editServiceOwnerSchema.parse(request.body)
    const serviceOwner = await this.editServiceOwnerService.execute(
      request.params.id,
      validatedData
    )
    return {
      statusCode: 200,
      body: serviceOwner,
    }
  }
}
