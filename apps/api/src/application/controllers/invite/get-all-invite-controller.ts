import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { GetAllInvitesService } from '@/application/services/invite/get-all-invite-service'

export class GetAllInviteController implements IController {
  constructor(private getAllInvitesService: GetAllInvitesService) {}

  async handle(_: IRequest): Promise<IResponse> {
    try {
      const invites = await this.getAllInvitesService.execute()
      return {
        statusCode: 200,
        body: { invites },
      }
    } catch (error) {
      throw new UnprocessableEntityError('prisma', 'Failed to retrieve invites.')
    }
  }
}
