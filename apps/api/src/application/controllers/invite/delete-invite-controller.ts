import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteInviteService } from '@/application/services/invite/delete-invite-service'
import z from 'zod'

const deleteInviteSchema = z.object({
  id: z.string(),
})

export class DeleteInviteController implements IController {
  constructor(private deleteInviteService: DeleteInviteService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    const result = deleteInviteSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      throw new UnprocessableEntityError('zod', 'Invalid invite ID.', errors)
    }

    const { id } = result.data
    await this.deleteInviteService.execute(id)

    return {
      statusCode: 204,
      body: null,
    }
  }
}
