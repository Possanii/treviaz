import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteServiceOwnerService } from '@/application/services/auth/serviceowner/delete-serviceowner-service'
import { serviceOwnerSchema } from '@/application/schemas/IServiceOwner'

const deleteServiceOwnerSchema = z.object({
    id: serviceOwnerSchema.shape.id
})

export class DeleteServiceOwnerController implements IController {
    constructor(private deleteServiceOwnerService: DeleteServiceOwnerService) {}

    async handle(request: IRequest): Promise<IResponse> {
        try {
            const validatedData = deleteServiceOwnerSchema.parse(request.params)
            await this.deleteServiceOwnerService.execute(validatedData.id)
            return {
                statusCode: 204,
                body: null
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                return {
                    statusCode: 400,
                    body: { message: 'Validation failed', errors: error.errors }
                }
            }
            if (error instanceof UnprocessableEntityError) {
                return {
                    statusCode: 422,
                    body: { message: error.message }
                }
            }
            throw error
        }
    }
}
