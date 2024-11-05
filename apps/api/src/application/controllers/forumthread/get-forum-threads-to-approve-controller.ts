import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetForumThreadsToApproveService } from '@/application/services/forumthread/get-forum-threads-to-approve-service'

export class GetForumThreadsToApproveController implements IController {
  constructor(
    private readonly getForumThreadsToApproveService: GetForumThreadsToApproveService
  ) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = condominiumSchema.pick({ slug: true }).safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'invalid condominium slug',
        errors
      )
    }

    const { slug } = result.data

    const threads = await this.getForumThreadsToApproveService.execute({
      slug,
    })

    return {
      statusCode: 200,
      body: threads,
    }
  }
}
