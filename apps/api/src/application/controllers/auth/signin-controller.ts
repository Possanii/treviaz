import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { SignInService } from '@/application/services/auth/signin-service'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export class SignInController implements IController {
  constructor(private signInService: SignInService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    const result = signInSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      throw new UnprocessableEntityError('validation', 'Invalid credentials.', errors)
    }

    const { email, password } = result.data
    const session = await this.signInService.execute({ email, password })

    return {
      statusCode: 200,
      body: {
        session,
      },
    }
  }
}