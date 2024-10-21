import { PrismaClient } from '@prisma/client'
import { IForumCategory } from '@/application/schemas/IForumCategory'
import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'

const prisma = new PrismaClient()

export class EditForumCategoryService {
    async execute(id: string, data: Partial<IForumCategory>): Promise<IForumCategory> {
        const existingForumCategory = await prisma.forumCategory.findUnique({
            where: { id }
        })

        if (!existingForumCategory) {
            throw new UnprocessableEntityError('forumCategory', 'Forum Category not found')
        }

        const updatedForumCategory = await prisma.forumCategory.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
            },
        })

        return {
            id: updatedForumCategory.id,
            name: updatedForumCategory.name,
            description: updatedForumCategory.description,
            created_at: updatedForumCategory.created_at,
            updated_at: updatedForumCategory.updated_at,
        }
    }
}
