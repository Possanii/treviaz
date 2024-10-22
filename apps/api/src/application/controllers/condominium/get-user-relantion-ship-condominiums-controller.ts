import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { userSchema } from '@/application/schemas/IUser'
import { GetUserRelantionShipCondominiumsService } from '@/application/services/condominium/get-user-relantion-ship-condominiums-service'

export class GetUserRelantionShipCondominiumsController implements IController {
  private readonly getUserRelantionShipCondominiumsService: GetUserRelantionShipCondominiumsService

  constructor(
    getUserRelantionShipCondominiumsService: GetUserRelantionShipCondominiumsService
  ) {
    this.getUserRelantionShipCondominiumsService =
      getUserRelantionShipCondominiumsService
  }

  async handle({ metadata }: IRequest): Promise<IResponse> {
    const result = userSchema
      .pick({
        id: true,
      })
      .safeParse({ id: metadata!.user!.uid })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError('zod', 'Invalid user id', errors)
    }

    const { id } = result.data

    const relantionships =
      await this.getUserRelantionShipCondominiumsService.execute({ id })

    return {
      statusCode: 200,
      body: { relantionships },
    }
  }
}
