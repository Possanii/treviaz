import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateCondominiumService } from '@/application/services/auth/condominium/create-condominium-service'

import { condominiumSchema } from '@/application/schemas/ICondominium'

const createCondominiumSchema = condominiumSchema.omit({ id: true })

export class CreateCondominiumController implements IController {
    constructor(private createCondominiumService: CreateCondominiumService) {}

    async handle(request: IRequest): Promise<IResponse> {
        try {
            const validatedData = createCondominiumSchema.parse(request.body)
            const condominium = await this.createCondominiumService.execute(validatedData)
            return {
                statusCode: 201,
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
