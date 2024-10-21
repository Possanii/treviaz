import { PrismaClient } from '@prisma/client'
import { IForumPost } from '@/application/schemas/IForumPost'
import { BadRequestError } from '@/application/errors/bad-request-error'

const prisma = new PrismaClient()

export class CreateForumPostService {
    async execute(data: Omit<IForumPost, 'id' | 'created_at' | 'updated_at'>): Promise<IForumPost> {
        const existingThread = await prisma.forumThread.findUnique({
            where: { id: data.thread_id }
        })

        if (!existingThread) {
            throw new BadRequestError('forumThread', 'Forum Thread does not exist')
        }

        const forumPost = await prisma.forumPost.create({
            data: {
                content: data.content,
                thread_id: data.thread_id,
                user_id: data.user_id,
            },
        })

        return {
            id: forumPost.id,
            content: forumPost.content,
            created_at: forumPost.created_at,
            updated_at: forumPost.updated_at,
            thread_id: forumPost.thread_id,
            user_id: forumPost.user_id,
        }
    }
}
