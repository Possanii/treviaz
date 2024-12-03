import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetUserByIdService } from '@/application/services/user/get-user-by-id-servuce'

export class GetUserByIdController implements IController {
  private readonly getUserByIdService: GetUserByIdService

  constructor(getUserByIdService: GetUserByIdService) {
    this.getUserByIdService = getUserByIdService
  }

  async handle({ params }: IRequest): Promise<IResponse> {
    const result = condominiumSchema
      .pick({ id: true, slug: true })
      .safeParse(params)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      throw new UnprocessableEntityError('zod', 'Invalid user data.', errors)
    }

    const { id, slug } = result.data

    const { user } = await this.getUserByIdService.execute({
      id,
      slug,
    })

    return {
      statusCode: 200,
      body: { user },
    }
  }
}
