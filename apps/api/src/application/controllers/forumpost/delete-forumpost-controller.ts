import { forumPostSchema } from '@treviaz/entities/schemas/forum/IForumPost'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteForumPostService } from '@/application/services/forumpost/delete-forumpost-service'

export class DeleteForumPostController implements IController {
  constructor(private deleteForumPostService: DeleteForumPostService) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = forumPostSchema
      .pick({
        id: true,
      })
      .safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError('zod', 'invalid post data', errors)
    }

    const { id } = result.data

    await this.deleteForumPostService.execute({ postId: id })

    return {
      statusCode: 204,
    }
  }
}
