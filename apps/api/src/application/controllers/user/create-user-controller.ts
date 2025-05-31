import z from 'zod'

import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { userSchema } from '@/application/schemas/IUser'
import { userCondominiumSchema } from '@/application/schemas/IUserCondominium'
import { CreateUserService } from '@/application/services/user/create-user-service'

const createUserSchema = userSchema.omit({ id: true }).extend({
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' }),
  condominium: userCondominiumSchema.omit({
    id: true,
    user_id: true,
    joined_at: true,
  }),
})

export class CreateUserController implements IController {
  constructor(private createUserService: CreateUserService) {}

  async handle(request: IRequest): Promise<IResponse> {
    const validatedData = createUserSchema.parse(request.body)
    await this.createUserService.execute(validatedData)
    return {
      statusCode: 201,
      body: null,
    }
  }
}
