import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { AcceptInviteService } from '@/application/services/invite/accept-invite-service'
import z from 'zod'

const acceptInviteSchema = z.object({
  token: z.string(),
})

export class AcceptInviteController implements IController {
  constructor(private acceptInviteService: AcceptInviteService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    const result = acceptInviteSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      throw new UnprocessableEntityError('zod', 'Invalid invite token.', errors)
    }

    const { token } = result.data
    const invite = await this.acceptInviteService.execute(token)

    return {
      statusCode: 200,
      body: invite,
    }
  }
}
