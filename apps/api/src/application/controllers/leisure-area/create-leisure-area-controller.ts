import { leisureAreaSchema } from '@treviaz/entities/schemas/ILeisureArea'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { condominiumSchema } from '@/application/schemas/ICondominium'
import { CreateLeisureAreaService } from '@/application/services/leisure-areas/create-leisure-area-service'

const createLeisureAreaSchema = leisureAreaSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .merge(condominiumSchema.pick({ slug: true }))

export class CreateLeisureAreaController implements IController {
  constructor(private createLeisureAreaService: CreateLeisureAreaService) {}

  async handle({ body, params }: IRequest): Promise<IResponse> {
    const result = createLeisureAreaSchema.safeParse({
      ...body,
      slug: params.condominiumSlug,
    })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Invalid leisure area data.',
        errors
      )
    }

    await this.createLeisureAreaService.execute({
      ...result.data,
      condominiumSlug: result.data.slug,
    })

    return {
      statusCode: 204,
      body: null,
    }
  }
}
