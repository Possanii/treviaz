import { forumThreadSchema } from '@treviaz/entities/schemas/forum/IForumThread'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteForumThreadService } from '@/application/services/forumthread/delete-forumthread-service'

export class DeleteForumThreadController implements IController {
  constructor(private deleteForumThreadService: DeleteForumThreadService) {}

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

    await this.deleteForumThreadService.execute(slug)
    return {
      statusCode: 204,
    }
  }
}
