import { forumThreadSchema } from '@treviaz/entities/schemas/forum/IForumThread'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DenyForumThreadService } from '@/application/services/forumthread/deny-forumthread-service'

export class DenyForumThreadController implements IController {
  constructor(private denyForumThreadService: DenyForumThreadService) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = forumThreadSchema
      .pick({
        slug: true,
      })
      .safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError('zod', 'invalid thread data', errors)
    }

    const { slug } = result.data

    await this.denyForumThreadService.execute(slug)

    return {
      statusCode: 204,
    }
  }
}
