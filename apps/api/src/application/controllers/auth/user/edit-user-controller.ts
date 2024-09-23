import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { EditUserService } from '@/application/services/auth/user/edit-user-service'

import { userSchema } from '@/application/schemas/IUser'
import { userCondominiumSchema } from '@/application/schemas/IUserCondominium'

const editUserSchema = userSchema.omit({ id: true }).extend({
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }).optional(),
    condominium: userCondominiumSchema.omit({ id: true, user_id: true, joined_at: true }).optional()
})

export class EditUserController implements IController {
    constructor(private editUserService: EditUserService) { }

    async handle(request: IRequest): Promise<IResponse> {
        try {
            const validatedData = editUserSchema.parse(request.body)
            const user = await this.editUserService.execute(request.params.id, validatedData)
            return {
                statusCode: 200,
                body: user
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
