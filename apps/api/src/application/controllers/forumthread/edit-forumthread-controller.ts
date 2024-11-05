/* eslint-disable camelcase */
import { forumThreadSchema } from '@treviaz/entities/schemas/forum/IForumThread'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { EditForumThreadService } from '@/application/services/forumthread/edit-forumthread-service'

export class EditForumThreadController implements IController {
  constructor(private editForumThreadService: EditForumThreadService) {}

  async handle({ body, params }: IRequest): Promise<IResponse> {
    const result = forumThreadSchema
      .pick({
        title: true,
        slug: true,
        description: true,
        thumbnail_url: true,
      })
      .safeParse({ ...body, ...params })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError('zod', 'invalid thread data', errors)
    }

    const { title, description, thumbnail_url, slug } = result.data

    await this.editForumThreadService.execute({
      title,
      description,
      thumbnail_url,
      slug,
    })
    return {
      statusCode: 204,
    }
  }
}
