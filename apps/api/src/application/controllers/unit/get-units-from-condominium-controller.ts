import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { condominiumSchema } from '@/application/schemas/ICondominium'
import { GetUnitsFromCondominiumService } from '@/application/services/unit/get-units-from-condominium-service'

export class GetUnitsFromCondominiumController implements IController {
  constructor(
    private readonly getUnitsFromCondominiumService: GetUnitsFromCondominiumService
  ) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = condominiumSchema.pick({ slug: true }).safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Invalid condominium id.',
        errors
      )
    }

    const units = await this.getUnitsFromCondominiumService.execute({
      condominiumSlug: result.data.slug,
    })

    return {
      statusCode: 200,
      body: { units },
    }
  }
}
