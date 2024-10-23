import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteUserCondominiumService } from '@/application/services/usercondominium/delete-usercondominium-service'

export class DeleteUserCondominiumController implements IController {
    constructor(private deleteUserCondominiumService: DeleteUserCondominiumService) {}

    async handle(request: IRequest): Promise<IResponse> {
        await this.deleteUserCondominiumService.execute(request.params.id)
        return {
            statusCode: 204,
            body: null
        }
    }
}
