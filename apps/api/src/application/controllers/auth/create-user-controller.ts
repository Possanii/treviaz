import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateUserService } from '@/application/services/auth/create-user-service'

import { userSchema } from '@/application/schemas/IUser'
import { userCondominiumSchema } from '@/application/schemas/IUserCondominium'

const createUserSchema = userSchema.omit({ id: true }).extend({
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
    condominium: userCondominiumSchema.omit({ id: true, user_id: true, joined_at: true })
})

export class CreateUserController implements IController {
    constructor(private createUserService: CreateUserService) {}

    async handle(request: IRequest): Promise<IResponse> {
        try {
            const validatedData = createUserSchema.parse(request.body)
            const user = await this.createUserService.execute(validatedData)
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
