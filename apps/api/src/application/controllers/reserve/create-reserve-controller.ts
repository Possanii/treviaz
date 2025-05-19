import { leisureAreaSchema } from '@treviaz/entities/schemas/ILeisureArea'
import { reserveSchema } from '@treviaz/entities/schemas/IReserve'

import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateReserveService } from '@/application/services/reserve/create-reserve-service'

export class CreateReserveController implements IController {
  constructor(private readonly createReserveService: CreateReserveService) {}

  async handle({ metadata, body }: IRequest): Promise<IResponse> {
    const result = leisureAreaSchema
      .pick({ id: true })
      .merge(
        reserveSchema.pick({
          start_date: true,
          end_date: true,
        })
      )
      .safeParse(body)

    if (!result.success) {
      return {
        statusCode: 400,
        body: result.error.format(),
      }
    }

    const data = result.data

    console.log(metadata)

    await this.createReserveService.execute(
      metadata!.user!.id,
      data.id,
      data.start_date,
      data.end_date
    )

    return {
      statusCode: 201,
    }
  }
}
