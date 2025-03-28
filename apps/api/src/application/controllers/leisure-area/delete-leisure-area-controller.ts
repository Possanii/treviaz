import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteLeisureAreaService } from '@/application/services/leisure-areas/delete-leisure-area-service'
import z from 'zod'

const deleteLeisureAreaSchema = z.object({
  id: z.string().uuid(),
})

export class DeleteLeisureAreaController implements IController {
  constructor(private deleteLeisureAreaService: DeleteLeisureAreaService) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = deleteLeisureAreaSchema.safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Invalid leisure area id.',
        errors
      )
    }

    await this.deleteLeisureAreaService.execute(result.data.id)

    return {
      statusCode: 204,
      body: null,
    }
  }
} 