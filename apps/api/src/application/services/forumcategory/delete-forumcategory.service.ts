import { PrismaClient } from '@prisma/client'
import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'

const prisma = new PrismaClient()

export class DeleteForumCategoryService {
    async execute(id: string): Promise<void> {
        const forumCategory = await prisma.forumCategory.findUnique({
            where: { id }
        })

        if (!forumCategory) {
            throw new UnprocessableEntityError('forumCategory', 'Forum Category not found')
        }

        await prisma.$transaction(async (prisma) => {
            // Delete all posts in threads in the category
            await prisma.forumPost.deleteMany({
                where: {
                    thread: {
                        category_id: id
                    }
                }
            })

            // Delete all threads in the category
            await prisma.forumThread.deleteMany({
                where: { category_id: id }
            })

            // Finally, delete the forum category itself
            await prisma.forumCategory.delete({
                where: { id }
            })
        })
    }
}



