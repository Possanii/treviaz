import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateUserService } from '@/application/services/auth/create-user-service'

const createUserSchema = z.object({
  email: z.string().email({
    message: 'Please, provide a valid email address.',
  }),
  name: z.string({
    message: 'Please, provide a valid name.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
})

export class CreateUserController implements IController {
  constructor(private readonly createUserService: CreateUserService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    const result = createUserSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError('zod', 'Invalid user data.', errors)
    }

    const data = result.data

    await this.createUserService.execute(data)

    return {
      statusCode: 201,
    }
  }
}
