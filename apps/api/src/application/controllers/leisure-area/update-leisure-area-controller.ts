import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { leisureAreaSchema } from '@/application/schemas/ILeisureArea'
import { UpdateLeisureAreaService } from '@/application/services/leisure-areas/update-leisure-area-service'

const updateLeisureAreaSchema = leisureAreaSchema.pick({
  name: true,
  description: true,
  photo_url: true,
})

export class UpdateLeisureAreaController implements IController {
  constructor(private updateLeisureAreaService: UpdateLeisureAreaService) {}

  async handle({ body, params }: IRequest): Promise<IResponse> {
    const result = updateLeisureAreaSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Invalid leisure area data.',
        errors
      )
    }

    await this.updateLeisureAreaService.execute(params.id, result.data)

    return {
      statusCode: 204,
      body: null,
    }
  }
} 