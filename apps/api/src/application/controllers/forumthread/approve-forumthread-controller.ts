import { forumThreadSchema } from '@treviaz/entities/schemas/forum/IForumThread'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { ApproveForumThreadService } from '@/application/services/forumthread/approve-forumthread-service'

export class ApproveForumThreadController implements IController {
  constructor(private approveForumThreadService: ApproveForumThreadService) {}

  async handle({ params, metadata }: IRequest): Promise<IResponse> {
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

    const { uid } = metadata!.user!

    await this.approveForumThreadService.execute({
      slug,
      id: uid,
    })
    return {
      statusCode: 204,
    }
  }
}
