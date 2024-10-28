import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { condominiumSchema } from '@/application/schemas/ICondominium'
import { GetCondominiumBySlugService } from '@/application/services/condominium/get-condominium-by-slug'

export class GetCondominiumBySlugController implements IController {
  private readonly getCondominiumBySlugService: GetCondominiumBySlugService

  constructor(getCondominiumBySlugService: GetCondominiumBySlugService) {
    this.getCondominiumBySlugService = getCondominiumBySlugService
  }

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = condominiumSchema.pick({ slug: true }).safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Slug do condomínio inválido.',
        errors
      )
    }

    const { slug } = result.data

    const { condominium } = await this.getCondominiumBySlugService.execute({
      slug,
    })

    return {
      statusCode: 200,
      body: { condominium },
    }
  }
}
