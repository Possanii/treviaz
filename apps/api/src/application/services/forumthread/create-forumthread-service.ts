import { PrismaClient } from '@prisma/client'
import { IForumThread } from '@/application/schemas/IForumThread'
import { BadRequestError } from '@/application/errors/bad-request-error'

const prisma = new PrismaClient()

export class CreateForumThreadService {
    async execute(data: Omit<IForumThread, 'id' | 'created_at' | 'updated_at'>): Promise<IForumThread> {
        const existingForumThread = await prisma.forumThread.findFirst({
            where: { title: data.title, category_id: data.category_id }
        })

        if (existingForumThread) {
            throw new BadRequestError('forumThread', 'Forum Thread with this title in the given category already exists')
        }

        const forumThread = await prisma.forumThread.create({
            data: {
                title: data.title,
                category_id: data.category_id,
                user_id: data.user_id,
                status: 'PENDING', 
            },
        })

        return {
            id: forumThread.id,
            title: forumThread.title,
            created_at: forumThread.created_at,
            updated_at: forumThread.updated_at,
            category_id: forumThread.category_id,
            user_id: forumThread.user_id,
            status: forumThread.status, 
        }
    }
}
