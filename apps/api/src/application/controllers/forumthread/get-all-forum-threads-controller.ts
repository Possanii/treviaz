import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetAllForumThreadsService } from '@/application/services/forumthread/get-all-forum-threads-service'

export class GetAllForumThreadsController implements IController {
  constructor(
    private readonly getAllForumThreadsService: GetAllForumThreadsService
  ) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = condominiumSchema.pick({ slug: true }).safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError('zod', 'invalid category slug', errors)
    }

    const { slug } = result.data

    const threads = await this.getAllForumThreadsService.execute({
      slug,
    })

    return {
      statusCode: 200,
      body: threads,
    }
  }
}
