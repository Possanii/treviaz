import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetInviteByTokenService } from '@/application/services/invite/get-invite-by-token-service'

const getInviteByTokenSchema = z.object({
  token: z.string(),
})

export class GetInviteByTokenController implements IController {
  constructor(private getInviteByTokenService: GetInviteByTokenService) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = getInviteByTokenSchema.safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      throw new UnprocessableEntityError('zod', 'Invalid invite token.', errors)
    }

    const { token } = result.data
    const invite = await this.getInviteByTokenService.execute(token)

    return {
      statusCode: 200,
      body: invite,
    }
  }
}
