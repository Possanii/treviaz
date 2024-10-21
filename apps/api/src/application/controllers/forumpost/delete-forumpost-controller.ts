import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteForumPostService } from '@/application/services/forumpost/delete-forumpost-service'

export class DeleteForumPostController implements IController {
    constructor(private deleteForumPostService: DeleteForumPostService) {}

    async handle(request: IRequest): Promise<IResponse> {
        const { id, userId } = request.body;
        await this.deleteForumPostService.execute(id, userId);
        return {
            statusCode: 204,
            body: {}
        }
    }
}
