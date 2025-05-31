import { forumCategorySchema } from '@treviaz/entities/schemas/forum/IForumCategory'
import { forumThreadSchema } from '@treviaz/entities/schemas/forum/IForumThread'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateForumThreadService } from '@/application/services/forumthread/create-forumthread-service'

export class CreateForumThreadController implements IController {
  constructor(private createForumThreadService: CreateForumThreadService) {}

  async handle({ body, params, metadata }: IRequest): Promise<IResponse> {
    const result = forumThreadSchema
      .pick({
        title: true,
        description: true,
        thumbnail_url: true,
      })
      .merge(
        forumCategorySchema.pick({
          slug: true,
        })
      )
      .safeParse({ ...body, ...params })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError('zod', 'invalid thread data', errors)
    }

    const thread = result.data

    const { id } = metadata!.user!

    await this.createForumThreadService.execute({
      ...thread,
      id,
    })
    return {
      statusCode: 204,
    }
  }
}
