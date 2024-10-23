import z from 'zod'

import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateForumPostService } from '@/application/services/forumpost/create-forumpost-service'

import { forumPostSchema } from '@/application/schemas/IForumPost'

const createForumPostSchema = forumPostSchema.omit({ id: true, created_at: true, updated_at: true })

export class CreateForumPostController implements IController {
    constructor(private createForumPostService: CreateForumPostService) {}

    async handle(request: IRequest): Promise<IResponse> {
        const validatedData = createForumPostSchema.parse(request.body)
        const forumPost = await this.createForumPostService.execute(validatedData)
        return {
            statusCode: 201,
            body: forumPost
        }
    }
}
