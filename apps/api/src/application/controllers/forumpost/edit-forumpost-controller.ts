import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { EditForumPostService } from '@/application/services/forumpost/edit-forumpost-service'

export class EditForumPostController implements IController {
    constructor(private editForumPostService: EditForumPostService) {}

    async handle(request: IRequest): Promise<IResponse> {
        const { id } = request.params
        const { content } = request.body
        const userId = request.metadata?.user?.sub

        if (!userId) {
            return {
                statusCode: 403,
                body: { error: 'User not authenticated' }
            }
        }

        const forumPost = await this.editForumPostService.execute(id, userId, content)
        return {
            statusCode: 200,
            body: forumPost
        }
    }
}

