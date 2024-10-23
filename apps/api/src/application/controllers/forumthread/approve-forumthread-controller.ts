import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { ApproveForumThreadService } from '@/application/services/forumthread/approve-forumthread-service'

export class ApproveForumThreadController implements IController {
    constructor(private approveForumThreadService: ApproveForumThreadService) {}

    async handle(request: IRequest): Promise<IResponse> {
        const { id } = request.params
        const userId = request.metadata?.user?.sub

        if (!userId) {
            return {
                statusCode: 403,
                body: { error: 'User not authenticated' }
            }
        }

        const forumThread = await this.approveForumThreadService.execute(id)
        return {
            statusCode: 200,
            body: forumThread
        }
    }
}
