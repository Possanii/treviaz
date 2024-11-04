import { forumCategorySchema } from '@treviaz/entities/schemas/forum/IForumCategory'
import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateForumCategoryService } from '@/application/services/forumcategory/create-forumcategory-service'

const createForumCategorySchema = forumCategorySchema
  .pick({
    name: true,
    description: true,
  })
  .merge(
    condominiumSchema.pick({
      slug: true,
    })
  )

export class CreateForumCategoryController implements IController {
  constructor(private createForumCategoryService: CreateForumCategoryService) {}

  async handle({ body, params, metadata }: IRequest): Promise<IResponse> {
    const result = createForumCategorySchema.safeParse({ ...body, ...params })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError('zod', 'invalid category data', errors)
    }

    await this.createForumCategoryService.execute({
      ...result.data,
      id: metadata!.user!.uid,
    })

    return {
      statusCode: 204,
    }
  }
}
