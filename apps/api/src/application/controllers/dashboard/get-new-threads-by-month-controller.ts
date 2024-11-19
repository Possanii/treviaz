import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetNewThreadsByMonthService } from '@/application/services/dashboard/get-new-threads-by-month-service'

export class GetNewThreadsByMonthController implements IController {
  private readonly getNewThreadsByMonthService: GetNewThreadsByMonthService

  constructor(getNewThreadsByMonthService: GetNewThreadsByMonthService) {
    this.getNewThreadsByMonthService = getNewThreadsByMonthService
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

    const totalNewThreads = await this.getNewThreadsByMonthService.execute({
      slug,
    })

    return {
      statusCode: 200,
      body: { totalNewThreads },
    }
  }
}
