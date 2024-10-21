import z from 'zod'

import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { EditUserService } from '@/application/services/user/edit-user-service'

import { userSchema } from '@/application/schemas/IUser'
import { userCondominiumSchema } from '@/application/schemas/IUserCondominium'

const editUserSchema = userSchema.omit({ id: true }).extend({
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }).optional(),
    condominium: userCondominiumSchema.omit({ id: true, user_id: true, joined_at: true }).optional()
})

export class EditUserController implements IController {
    constructor(private editUserService: EditUserService) { }

    async handle(request: IRequest): Promise<IResponse> {
        const validatedData = editUserSchema.parse(request.body)
        const user = await this.editUserService.execute(request.params.id, validatedData)
        return {
            statusCode: 200,
            body: user
        }
    }
}
