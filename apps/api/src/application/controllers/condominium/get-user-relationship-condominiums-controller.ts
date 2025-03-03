import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { userSchema } from '@/application/schemas/IUser'
import { GetUserRelationshipCondominiumsService } from '@/application/services/condominium/get-user-relationship-condominiums-service'

export class GetUserRelationshipCondominiumsController implements IController {
  private readonly getUserRelationshipCondominiumsService: GetUserRelationshipCondominiumsService

  constructor(
    getUserRelantionShipCondominiumsService: GetUserRelationshipCondominiumsService
  ) {
    this.getUserRelationshipCondominiumsService =
      getUserRelantionShipCondominiumsService
  }

  async handle({ metadata }: IRequest): Promise<IResponse> {
    const result = userSchema
      .pick({
        id: true,
      })
      .safeParse({ id: metadata!.user!.id })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError('zod', 'Invalid user id', errors)
    }

    const { id } = result.data

    const relantionships =
      await this.getUserRelationshipCondominiumsService.execute({ id })

    return {
      statusCode: 200,
      body: { relantionships },
    }
  }
}
