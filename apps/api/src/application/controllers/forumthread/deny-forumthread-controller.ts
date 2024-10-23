import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DenyForumThreadService } from '@/application/services/forumthread/deny-forumthread-service'

export class DenyForumThreadController implements IController {
    constructor(private denyForumThreadService: DenyForumThreadService) {}

    async handle(request: IRequest): Promise<IResponse> {
        const { id } = request.params
        const userId = request.metadata?.user?.sub

        if (!userId) {
            return {
                statusCode: 403,
                body: { error: 'User not authenticated' }
            }
        }

        const forumThread = await this.denyForumThreadService.execute(id)
        return {
            statusCode: 200,
            body: forumThread
        }
    }
}

