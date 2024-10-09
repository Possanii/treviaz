import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { EditForumThreadService } from '@/application/services/forumthread/edit-forumthread-service'
import { forumThreadSchema } from '@/application/schemas/IForumThread'

const editForumThreadSchema = forumThreadSchema.omit({ id: true, created_at: true, updated_at: true })

export class EditForumThreadController implements IController {
    constructor(private editForumThreadService: EditForumThreadService) {}

    async handle(request: IRequest): Promise<IResponse> {
        const { id } = request.params
        const userId = request.metadata?.user?.sub

        if (!userId) {
            return {
                statusCode: 403,
                body: { error: 'User not authenticated' }
            }
        }

        const validatedData = editForumThreadSchema.parse(request.body)
        const forumThread = await this.editForumThreadService.execute(id, userId, validatedData)
        return {
            statusCode: 200,
            body: forumThread
        }
    }
}

