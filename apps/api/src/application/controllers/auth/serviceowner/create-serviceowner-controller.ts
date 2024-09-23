import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateServiceOwnerService } from '@/application/services/auth/serviceowner/create-serviceowner-service'
import { serviceOwnerSchema } from '@/application/schemas/IServiceOwner'

const createServiceOwnerSchema = serviceOwnerSchema.omit({ id: true }).extend({
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' })  
})

export class CreateServiceOwnerController implements IController {
    constructor(private createServiceOwnerService: CreateServiceOwnerService) { }

    async handle(request: IRequest): Promise<IResponse> {
        try {
            const validatedData = createServiceOwnerSchema.parse(request.body)
            const serviceOwner = await this.createServiceOwnerService.execute(validatedData)
            return {
                statusCode: 201,
                body: serviceOwner
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
