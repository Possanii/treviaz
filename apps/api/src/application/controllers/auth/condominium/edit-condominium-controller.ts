import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { EditCondominiumService } from '@/application/services/auth/condominium/edit-condominium-service'

import { condominiumSchema } from '@/application/schemas/ICondominium'

const editCondominiumSchema = condominiumSchema.omit({ id: true }).partial()

export class EditCondominiumController implements IController {
    constructor(private editCondominiumService: EditCondominiumService) {}

    async handle(request: IRequest): Promise<IResponse> {
        try {
            const validatedData = editCondominiumSchema.parse(request.body)
            const condominium = await this.editCondominiumService.execute(request.params.id, validatedData)
            return {
                statusCode: 200,
                body: condominium
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
