import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteForumCategoryService } from '@/application/services/auth/forumcategory/delete-forumcategory.service'

export class DeleteForumCategoryController implements IController {
    constructor(private deleteForumCategoryService: DeleteForumCategoryService) {}

    async handle(request: IRequest): Promise<IResponse> {
        const { id } = request.params
        await this.deleteForumCategoryService.execute(id)
        return {
            statusCode: 204,
            body: {}
        }
    }
}
