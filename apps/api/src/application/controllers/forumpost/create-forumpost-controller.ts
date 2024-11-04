import { forumCategorySchema } from '@treviaz/entities/schemas/forum/IForumCategory'
import { forumPostSchema } from '@treviaz/entities/schemas/forum/IForumPost'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateForumPostService } from '@/application/services/forumpost/create-forumpost-service'

export class CreateForumPostController implements IController {
  constructor(private createForumPostService: CreateForumPostService) {}

  async handle({ body, params }: IRequest): Promise<IResponse> {
    const result = forumPostSchema
      .pick({
        content: true,
      })
      .merge(
        forumCategorySchema.pick({
          id: true,
        })
      )
      .safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError('zod', 'invalid post data', errors)
    }

    const post = result.data

    const forumPost = await this.createForumPostService.execute(post)
    return {
      statusCode: 201,
      body: forumPost,
    }
  }
}
