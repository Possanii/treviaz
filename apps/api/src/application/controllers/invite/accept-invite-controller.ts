import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { AcceptInviteService } from '@/application/services/invite/accept-invite-service'
import { GetUserByEmailService } from '@/application/services/user/get-user-by-email-service'
import { CreateUserCondominiumService } from '@/application/services/usercondominium/create-usercondominium-service'

const acceptInviteSchema = z.object({
  token: z.string(),
})

export class AcceptInviteController implements IController {
  constructor(
    private acceptInviteService: AcceptInviteService,
    private getUserByEmailService: GetUserByEmailService,
    private createUserCondominiumService: CreateUserCondominiumService
  ) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = acceptInviteSchema.safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      throw new UnprocessableEntityError('zod', 'Invalid invite token.', errors)
    }

    const { token } = result.data

    const invite = await this.acceptInviteService.execute(token)

    const user = await this.getUserByEmailService.execute({
      email: invite.email,
    })

    await this.createUserCondominiumService.execute({
      user_id: user.id,
      role: invite.role,
      condominium_id: invite.condominium_id,
    })

    return {
      statusCode: 204,
    }
  }
}
