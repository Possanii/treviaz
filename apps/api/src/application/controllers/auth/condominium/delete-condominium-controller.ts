import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteCondominiumService } from '@/application/services/auth/condominium/delete-condominium-service'

const deleteCondominiumSchema = z.object({
    id: z.string().uuid()
})

export class DeleteCondominiumController implements IController {
    constructor(private deleteCondominiumService: DeleteCondominiumService) {}

    async handle(request: IRequest): Promise<IResponse> {
        try {
            const validatedData = deleteCondominiumSchema.parse(request.params)
            await this.deleteCondominiumService.execute(validatedData.id)
            return {
                statusCode: 200,
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
