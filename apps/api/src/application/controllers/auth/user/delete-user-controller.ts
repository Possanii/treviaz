
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteUserService } from '@/application/services/auth/user/delete-user-service'
import z from 'zod'

const deleteUserSchema = z.object({
    id: z.string().uuid()
})

export class DeleteUserController implements IController {
    constructor(private deleteUserService: DeleteUserService) { }

    async handle(request: IRequest): Promise<IResponse> {
        const validatedData = deleteUserSchema.parse(request.params)
        await this.deleteUserService.execute(validatedData.id)
        return {
            statusCode: 200,
            body: null
        }
    }
}