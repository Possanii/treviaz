import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateForumThreadService } from '@/application/services/forumthread/create-forumthread-service'
import { forumThreadSchema } from '@/application/schemas/IForumThread'

const createForumThreadSchema = forumThreadSchema.omit({ id: true, created_at: true, updated_at: true })

export class CreateForumThreadController implements IController {
    constructor(private createForumThreadService: CreateForumThreadService) {}

    async handle(request: IRequest): Promise<IResponse> {
        const validatedData = createForumThreadSchema.parse(request.body)
        const userId = request.metadata?.user?.sub

        if (!userId) {
            return {
                statusCode: 403,
                body: { error: 'User not authenticated' }
            }
        }

        validatedData.user_id = userId

        const forumThread = await this.createForumThreadService.execute(validatedData)
        return {
            statusCode: 201,
            body: forumThread
        }
    }
}
