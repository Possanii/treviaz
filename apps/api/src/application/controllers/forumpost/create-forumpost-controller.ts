import { forumPostSchema } from '@treviaz/entities/schemas/forum/IForumPost'
import { forumThreadSchema } from '@treviaz/entities/schemas/forum/IForumThread'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateForumPostService } from '@/application/services/forumpost/create-forumpost-service'

export class CreateForumPostController implements IController {
  constructor(private createForumPostService: CreateForumPostService) {}

  async handle({ body, params, metadata }: IRequest): Promise<IResponse> {
    const result = forumPostSchema
      .pick({
        content: true,
      })
      .merge(
        forumThreadSchema.pick({
          slug: true,
        })
      )
      .safeParse({ ...body, ...params })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError('zod', 'invalid post data', errors)
    }

    const post = result.data

    const { uid } = metadata!.user!

    await this.createForumPostService.execute({
      ...post,
      id: uid,
    })
    return {
      statusCode: 201,
    }
  }
}
