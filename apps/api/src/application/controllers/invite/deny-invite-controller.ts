import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DenyInviteService } from '@/application/services/invite/deny-invite-service'

const denyInviteSchema = z.object({
  token: z.string(),
})

export class DenyInviteController implements IController {
  constructor(private denyInviteService: DenyInviteService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    const result = denyInviteSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      throw new UnprocessableEntityError('zod', 'Invalid invite token.', errors)
    }

    const { token } = result.data
    const invite = await this.denyInviteService.execute(token)

    return {
      statusCode: 200,
      body: invite,
    }
  }
}
