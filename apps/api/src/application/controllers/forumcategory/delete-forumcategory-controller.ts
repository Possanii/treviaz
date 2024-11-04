import { forumCategorySchema } from '@treviaz/entities/schemas/forum/IForumCategory'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteForumCategoryService } from '@/application/services/forumcategory/delete-forumcategory-service'

export class DeleteForumCategoryController implements IController {
  constructor(private deleteForumCategoryService: DeleteForumCategoryService) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = forumCategorySchema.pick({ id: true }).safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Invalid forum category id',
        errors
      )
    }

    const { id } = result.data

    await this.deleteForumCategoryService.execute(id)

    return {
      statusCode: 204,
    }
  }
}
