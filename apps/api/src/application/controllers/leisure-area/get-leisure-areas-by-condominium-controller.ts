import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetLeisureAreasByCondominiumService } from '@/application/services/leisure-areas/get-leisure-areas-by-condominium-service'
import z from 'zod'

const getLeisureAreasByCondominiumSchema = z.object({
  condominiumId: z.string().uuid(),
})

export class GetLeisureAreasByCondominiumController implements IController {
  constructor(
    private getLeisureAreasByCondominiumService: GetLeisureAreasByCondominiumService
  ) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = getLeisureAreasByCondominiumSchema.safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Invalid condominium id.',
        errors
      )
    }

    const leisureAreas = await this.getLeisureAreasByCondominiumService.execute(
      result.data.condominiumId
    )

    return {
      statusCode: 200,
      body: { leisureAreas },
    }
  }
} 