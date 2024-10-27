import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { RevokeInviteService } from '@/application/services/invite/revoke-invite-service'
import z from 'zod'

const revokeInviteSchema = z.object({
  id: z.string(),
})

export class RevokeInviteController implements IController {
  constructor(private revokeInviteService: RevokeInviteService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    const result = revokeInviteSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      throw new UnprocessableEntityError('zod', 'Invalid invite revoke data.', errors)
    }

    const { id } = result.data
    const invite = await this.revokeInviteService.execute(id)

    return {
      statusCode: 200,
      body: invite,
    }
  }
}
