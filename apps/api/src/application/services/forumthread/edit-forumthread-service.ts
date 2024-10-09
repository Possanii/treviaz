import { PrismaClient } from '@prisma/client'
import { IForumThread } from '@/application/schemas/IForumThread'
import { NotFoundError } from '@/application/errors/not-found-error'

const prisma = new PrismaClient()

export class EditForumThreadService {
    async execute(threadId: string, userId: string, data: Partial<Omit<IForumThread, 'id' | 'created_at' | 'updated_at' | 'user_id'>>): Promise<IForumThread> {
        const thread = await prisma.forumThread.findUnique({
            where: { id: threadId },
        })

        if (!thread) {
            throw new NotFoundError('forumThread', 'Thread not found')
        }

        if (thread.user_id !== userId) {
            throw new Error('User is not authorized to edit this thread')
        }

        const updatedThread = await prisma.forumThread.update({
            where: { id: threadId },
            data: {
                title: data.title ?? thread.title,
                category_id: data.category_id ?? thread.category_id,
            },
        })

        return {
            id: updatedThread.id,
            title: updatedThread.title,
            created_at: updatedThread.created_at,
            updated_at: updatedThread.updated_at,
            category_id: updatedThread.category_id,
            user_id: updatedThread.user_id,
        }
    }
}

