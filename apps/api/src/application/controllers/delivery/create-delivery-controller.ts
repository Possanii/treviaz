import { NotFoundError } from '@/application/errors/not-found-error'
import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { condominiumSchema } from '@/application/schemas/ICondominium'
import { DeliverySchema } from '@/application/schemas/IDelivery'
import { GetCondominiumBySlugService } from '@/application/services/condominium/get-condominium-by-slug'
import { CreateDeliveryService } from '@/application/services/delivery/create-delivery-service'

const createDeliverySchema = DeliverySchema.omit({
  id: true,
  condominium_id: true,
  status: true,
})

export class CreateDeliveryController implements IController {
  constructor(
    private readonly getCondominiumBySlugService: GetCondominiumBySlugService,
    private createDeliveryService: CreateDeliveryService
  ) {}

  async handle({ params, metadata }: IRequest): Promise<IResponse> {
    const result = createDeliverySchema.safeParse({
      user_id: metadata?.user?.id,
    })

    const resultSlug = condominiumSchema
      .pick({
        slug: true,
      })
      .safeParse(params)

    if (!result.success || !resultSlug.success) {
      const errors = result.error
        ? result.error.flatten().fieldErrors
        : resultSlug.error!.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Invalid delivery data.',
        errors
      )
    }

    const { condominium } = await this.getCondominiumBySlugService.execute({
      slug: resultSlug.data.slug,
    })

    if (!condominium) {
      throw new NotFoundError(
        'condominium',
        'No condominium was found for this slug'
      )
    }

    await this.createDeliveryService.execute({
      user_id: result.data.user_id,
      condominium_id: condominium.id,
    })

    return {
      statusCode: 204,
      body: null,
    }
  }
}
