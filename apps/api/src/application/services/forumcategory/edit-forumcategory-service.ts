import { PrismaClient } from '@prisma/client'
import { IForumCategory } from '@treviaz/entities/schemas/forum/IForumCategory'

import { NotFoundError } from '@/application/errors/not-found-error'
import { createSlug } from '@/application/utils/create-slug'

const prisma = new PrismaClient()

export class EditForumCategoryService {
  async execute({
    id,
    name,
    description,
  }: Pick<IForumCategory, 'id' | 'name' | 'description'>): Promise<void> {
    const existingForumCategory = await prisma.forumCategory.findFirst({
      where: {
        OR: [
          {
            id,
          },
          {
            slug: createSlug(name),
          },
        ],
      },
    })

    if (!existingForumCategory) {
      throw new NotFoundError(
        'forumCategory',
        'Forum Category not found or slug already exists.'
      )
    }

    await prisma.forumCategory.update({
      where: { id },
      data: {
        name,
        slug: createSlug(name),
        description,
      },
    })
  }
}
