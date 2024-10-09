import { PrismaClient } from '@prisma/client'
import { IForumCategory } from '@/application/schemas/IForumCategory'
import { BadRequestError } from '@/application/errors/bad-request-error'

const prisma = new PrismaClient()

export class CreateForumCategoryService {
    async execute(data: Omit<IForumCategory, 'id' | 'created_at' | 'updated_at'>): Promise<IForumCategory> {
        const existingForumCategory = await prisma.forumCategory.findUnique({
            where: { name: data.name }
        })

        if (existingForumCategory) {
            throw new BadRequestError('forumCategory', 'Forum Category with this name already exists')
        }

        const forumCategory = await prisma.forumCategory.create({
            data: {
                name: data.name,
                description: data.description,
            },
        })

        return {
            id: forumCategory.id,
            name: forumCategory.name,
            description: forumCategory.description,
            created_at: forumCategory.created_at,
            updated_at: forumCategory.updated_at,
        }
    }
}
