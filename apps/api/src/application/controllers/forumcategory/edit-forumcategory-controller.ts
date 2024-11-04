import { forumCategorySchema } from '@treviaz/entities/schemas/forum/IForumCategory'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { EditForumCategoryService } from '@/application/services/forumcategory/edit-forumcategory-service'

export class EditForumCategoryController implements IController {
  constructor(private editForumCategoryService: EditForumCategoryService) {}

  async handle({ body, params }: IRequest): Promise<IResponse> {
    const result = forumCategorySchema
      .pick({
        name: true,
        slug: true,
        description: true,
      })
      .safeParse({ ...body, ...params })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Invalid forum category data',
        errors
      )
    }

    const category = result.data

    await this.editForumCategoryService.execute(category)

    return {
      statusCode: 200,
    }
  }
}
