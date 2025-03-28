import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { leisureAreaSchema } from '@/application/schemas/ILeisureArea'
import { CreateLeisureAreaService } from '@/application/services/leisure-areas/create-leisure-area-service'

const createLeisureAreaSchema = leisureAreaSchema.omit({
  id: true,
  created_at: true,
})

export class CreateLeisureAreaController implements IController {
  constructor(private createLeisureAreaService: CreateLeisureAreaService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    const result = createLeisureAreaSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Invalid leisure area data.',
        errors
      )
    }

    await this.createLeisureAreaService.execute(result.data)

    return {
      statusCode: 204,
      body: null,
    }
  }
} 