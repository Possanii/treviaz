import z from 'zod'

import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateForumCategoryService } from '@/application/services/auth/forumcategory/create-forumcategory-service'

import { forumCategorySchema } from '@/application/schemas/IForumCategory'

const createForumCategorySchema = forumCategorySchema.omit({ id: true, created_at: true, updated_at: true })

export class CreateForumCategoryController implements IController {
    constructor(private createForumCategoryService: CreateForumCategoryService) {}

    async handle(request: IRequest): Promise<IResponse> {
        const validatedData = createForumCategorySchema.parse(request.body)
        const forumCategory = await this.createForumCategoryService.execute(validatedData)
        return {
            statusCode: 201,
            body: forumCategory
        }
    }
}
