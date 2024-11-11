import { forumPostSchema } from '@treviaz/entities/schemas/forum/IForumPost'
import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'
import z from 'zod'

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
        condominiumSchema.pick({
          slug: true,
        })
      )
      .extend({
        threadSlug: z.string().min(1),
      })
      .safeParse({
        ...body,
        slug: params.condSlug,
        threadSlug: params.threadSlug,
      })

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
