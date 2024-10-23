import { PrismaClient } from '@prisma/client'
import { IForumThread } from '@/application/schemas/IForumThread'
import { NotFoundError } from '@/application/errors/not-found-error'

const prisma = new PrismaClient()

export class DenyForumThreadService {
    async execute(threadId: string): Promise<IForumThread> {
        const thread = await prisma.forumThread.findUnique({
            where: { id: threadId },
        })

        if (!thread) {
            throw new NotFoundError('forumThread', 'Thread not found')
        }

        const deniedThread = await prisma.forumThread.update({
            where: { id: threadId },
            data: {
                status: 'DENIED',
            },
        })

        return {
            id: deniedThread.id,
            title: deniedThread.title,
            created_at: deniedThread.created_at,
            updated_at: deniedThread.updated_at,
            category_id: deniedThread.category_id,
            user_id: deniedThread.user_id,
            status: deniedThread.status,
        }
    }
}
