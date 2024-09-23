
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteUserService } from '@/application/services/auth/user/delete-user-service'
import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import z from 'zod'

const deleteUserSchema = z.object({
    id: z.string().uuid()
})

export class DeleteUserController implements IController {
    constructor(private deleteUserService: DeleteUserService) { }

    async handle(request: IRequest): Promise<IResponse> {
        try {
            const validatedData = deleteUserSchema.parse(request.params)
            await this.deleteUserService.execute(validatedData.id)
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