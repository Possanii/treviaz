import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetForumCategoriesFromCondominiumService } from '@/application/services/forumcategory/get-forum-categories-from-condominium-service'

export class GetForumCategoriesFromCondominiumController
  implements IController
{
  constructor(
    private readonly getForumCategoriesFromCondominiumService: GetForumCategoriesFromCondominiumService
  ) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = condominiumSchema.pick({ slug: true }).safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'invalid condominium slug',
        errors
      )
    }

    const { slug } = result.data

    const categories =
      await this.getForumCategoriesFromCondominiumService.execute({
        slug,
      })

    return {
      statusCode: 200,
      body: categories,
    }
  }
}
