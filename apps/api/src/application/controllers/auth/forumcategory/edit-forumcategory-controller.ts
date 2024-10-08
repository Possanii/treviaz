import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { EditForumCategoryService } from '@/application/services/auth/forumcategory/edit-forumcategory-service'
import { forumCategorySchema } from '@/application/schemas/IForumCategory'

const editForumCategorySchema = forumCategorySchema.omit({ created_at: true, updated_at: true })

export class EditForumCategoryController implements IController {
    constructor(private editForumCategoryService: EditForumCategoryService) {}

    async handle(request: IRequest): Promise<IResponse> {
        const { id } = request.params
        const validatedData = editForumCategorySchema.parse(request.body)
        const forumCategory = await this.editForumCategoryService.execute(id, validatedData)
        return {
            statusCode: 200,
            body: forumCategory
        }
    }
}
