import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetForumThreadBySlugService } from '@/application/services/forumthread/get-forum-threads-by-slug-service'

export class GetForumThreadBySlugController implements IController {
  constructor(
    private readonly getForumThreadBySlugService: GetForumThreadBySlugService
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

    const thread = await this.getForumThreadBySlugService.execute({
      slug,
    })

    return {
      statusCode: 200,
      body: thread,
    }
  }
}
