import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'
import z from 'zod'

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
    const result = condominiumSchema
      .pick({ slug: true })
      .extend({
        threadSlug: z.string().min(1),
      })
      .safeParse({ slug: params.condSlug, threadSlug: params.threadSlug })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'invalid condominium slug',
        errors
      )
    }

    const { slug, threadSlug } = result.data

    const thread = await this.getForumThreadBySlugService.execute({
      slug,
      threadSlug,
    })

    return {
      statusCode: 200,
      body: thread,
    }
  }
}
