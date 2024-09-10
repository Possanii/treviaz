import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateUserService } from '@/application/services/create-user-service'

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().nullable(),
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

    const user = await this.createUserService.execute(data)

    return {
      statusCode: 201,
      body: {
        user,
      },
    }
  }
}
