import { PrismaClient } from '@prisma/client'
import { NotFoundError } from '@/application/errors/not-found-error'
import { IForumThread } from '@/application/schemas/IForumThread' // Import the IForumThread interface

const prisma = new PrismaClient()

export class DeleteForumThreadService {
    async execute(threadId: string, userId: string): Promise<void> {
        const thread: IForumThread | null = await prisma.forumThread.findUnique({
            where: { id: threadId },
        })

        if (!thread) {
            throw new NotFoundError('forumThread', 'Thread not found')
        }

        if (thread.user_id !== userId) {
            throw new Error('User is not authorized to delete this thread')
        }

        // Delete all posts
        await prisma.forumPost.deleteMany({
            where: { thread_id: threadId },
        })

        await prisma.forumThread.delete({
            where: { id: threadId },
        })
    }
}
