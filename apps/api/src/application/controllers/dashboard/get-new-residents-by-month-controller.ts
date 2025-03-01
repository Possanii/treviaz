import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetNewResidentsByMonthService } from '@/application/services/dashboard/get-new-residents-by-month-service'

export class GetNewResidentsByMonthController implements IController {
  private readonly getNewResidentsByMonthService: GetNewResidentsByMonthService

  constructor(getNewResidentsByMonthService: GetNewResidentsByMonthService) {
    this.getNewResidentsByMonthService = getNewResidentsByMonthService
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

    const totalNewresidents = await this.getNewResidentsByMonthService.execute({
      slug,
    })

    return {
      statusCode: 200,
      body: { totalNewresidents },
    }
  }
}
