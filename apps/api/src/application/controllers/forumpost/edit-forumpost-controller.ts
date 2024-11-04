import { forumPostSchema } from '@treviaz/entities/schemas/forum/IForumPost'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { EditForumPostService } from '@/application/services/forumpost/edit-forumpost-service'

export class EditForumPostController implements IController {
  constructor(private editForumPostService: EditForumPostService) {}

  async handle({ body, params }: IRequest): Promise<IResponse> {
    const result = forumPostSchema
      .pick({
        id: true,
        content: true,
      })
      .safeParse({ ...body, ...params })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError('zod', 'invalid post data', errors)
    }

    const post = result.data

    await this.editForumPostService.execute(post)

    return {
      statusCode: 204,
    }
  }
}
