import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetNewLiversByMonthService } from '@/application/services/dashboard/get-new-livers-by-month-service'

export class GetNewLiversByMonthController implements IController {
  private readonly getNewLiversByMonthService: GetNewLiversByMonthService

  constructor(getNewLiversByMonthService: GetNewLiversByMonthService) {
    this.getNewLiversByMonthService = getNewLiversByMonthService
  }

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = condominiumSchema.pick({ slug: true }).safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'condominium',
        'Invalid condominium slug',
        errors
      )
    }

    const { slug } = result.data

    const totalNewLivers = await this.getNewLiversByMonthService.execute({
      slug,
    })

    return {
      statusCode: 200,
      body: { totalNewLivers },
    }
  }
}
