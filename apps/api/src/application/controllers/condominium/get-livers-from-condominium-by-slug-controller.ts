import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetLiversFromCondominiumBySlugService } from '@/application/services/condominium/get-livers-from-condominium-by-slug-service'

export class GetLiversFromCondominiumBySlugController implements IController {
  private readonly getLiversFromCondominiumBySlugService: GetLiversFromCondominiumBySlugService

  constructor(
    getLiversFromCondominiumBySlugService: GetLiversFromCondominiumBySlugService
  ) {
    this.getLiversFromCondominiumBySlugService =
      getLiversFromCondominiumBySlugService
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

    const { livers } = await this.getLiversFromCondominiumBySlugService.execute(
      {
        slug,
      }
    )

    return {
      statusCode: 200,
      body: { livers },
    }
  }
}
