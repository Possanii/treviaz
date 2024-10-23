import { PrismaClient } from '@prisma/client'
import { IForumThread } from '@/application/schemas/IForumThread'
import { NotFoundError } from '@/application/errors/not-found-error'

const prisma = new PrismaClient()

export class ApproveForumThreadService {
    async execute(threadId: string): Promise<IForumThread> {
        const thread = await prisma.forumThread.findUnique({
            where: { id: threadId },
        })

        if (!thread) {
            throw new NotFoundError('forumThread', 'Thread not found')
        }

        const updatedThread = await prisma.forumThread.update({
            where: { id: threadId },
            data: {
                status: 'APPROVED',
            },
        })

        return {
            id: updatedThread.id,
            title: updatedThread.title,
            created_at: updatedThread.created_at,
            updated_at: updatedThread.updated_at,
            category_id: updatedThread.category_id,
            user_id: updatedThread.user_id,
            status: updatedThread.status,
        }
    }
}
