import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetResidentsFromCondominiumBySlugService } from '@/application/services/condominium/get-residents-from-condominium-by-slug-service'

export class GetResidentsFromCondominiumBySlugController
  implements IController
{
  private readonly getResidentsFromCondominiumBySlugService: GetResidentsFromCondominiumBySlugService

  constructor(
    getResidentsFromCondominiumBySlugService: GetResidentsFromCondominiumBySlugService
  ) {
    this.getResidentsFromCondominiumBySlugService =
      getResidentsFromCondominiumBySlugService
  }

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = condominiumSchema.pick({ slug: true }).safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Slug do condomínio é inválido.',
        errors
      )
    }

    const { slug } = result.data

    const { residents } =
      await this.getResidentsFromCondominiumBySlugService.execute({
        slug,
      })

    return {
      statusCode: 200,
      body: { residents },
    }
  }
}
