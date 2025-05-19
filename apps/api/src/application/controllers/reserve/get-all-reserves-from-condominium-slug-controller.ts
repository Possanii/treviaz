import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { condominiumSchema } from '@/application/schemas/ICondominium'
import { GetAllReservesFromCondominiumSlugService } from '@/application/services/reserve/get-all-reserves-from-condominium-slug-service'

export class GetAllReservesFromCondominiumSlugController
  implements IController
{
  constructor(
    private readonly getAllReservesFromCondominiumSlugService: GetAllReservesFromCondominiumSlugService
  ) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = condominiumSchema
      .pick({ slug: true })
      .safeParse({ slug: params.condominiumSlug })

    if (!result.success) {
      return {
        statusCode: 400,
        body: result.error.format(),
      }
    }

    const { slug } = result.data

    const reserves =
      await this.getAllReservesFromCondominiumSlugService.execute(slug)

    return {
      statusCode: 201,
      body: { reserves },
    }
  }
}
