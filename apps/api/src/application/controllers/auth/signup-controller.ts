import z from 'zod'

import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { userSchema } from '@/application/schemas/IUser'
import { userCondominiumSchema } from '@/application/schemas/IUserCondominium'
import { SignUpService } from '@/application/services/auth/signup-service'

const createUserSchema = userSchema.omit({ id: true }).extend({
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' }),
  condominium: userCondominiumSchema
    .omit({
      id: true,
      user_id: true,
      joined_at: true,
    })
    .optional(),
})

export class SignUpController implements IController {
  constructor(private signUpService: SignUpService) {}

  async handle(request: IRequest): Promise<IResponse> {
    const validatedData = createUserSchema.safeParse(request.body)

    if (!validatedData.success) {
      const errors = validatedData.error.flatten().fieldErrors

      return {
        statusCode: 422,
        body: {
          message: 'Invalid user data.',
          errors,
        },
      }
    }

    const user = await this.signUpService.execute(validatedData.data)
    return {
      statusCode: 201,
      body: {
        user,
      },
    }
  }
}
