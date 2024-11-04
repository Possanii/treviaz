import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetAllInvitesService } from '@/application/services/invite/get-all-invite-service'

export class GetAllInviteController implements IController {
  constructor(private getAllInvitesService: GetAllInvitesService) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = condominiumSchema.pick({ slug: true }).safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Invalid condominium slug',
        errors
      )
    }

    const { slug } = result.data

    const invites = await this.getAllInvitesService.execute({
      slug,
    })
    return {
      statusCode: 200,
      body: { invites },
    }
  }
}
