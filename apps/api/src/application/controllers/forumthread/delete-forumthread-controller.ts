import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteForumThreadService } from '@/application/services/forumthread/delete-forumthread-service'

export class DeleteForumThreadController implements IController {
    constructor(private deleteForumThreadService: DeleteForumThreadService) {}

    async handle(request: IRequest): Promise<IResponse> {
        const { id } = request.params
        const userId = request.metadata?.user?.sub

        if (!userId) {
            return {
                statusCode: 403,
                body: { error: 'User not authenticated' }
            }
        }

        await this.deleteForumThreadService.execute(id, userId)
        return {
            statusCode: 204,
            body: {}
        }
    }
}
