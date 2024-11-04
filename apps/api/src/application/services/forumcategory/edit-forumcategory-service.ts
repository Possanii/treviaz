import { IForumCategory } from '@treviaz/entities/schemas/forum/IForumCategory'

import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '@/application/libs/prisma'
import { createSlug } from '@/application/utils/create-slug'

export class EditForumCategoryService {
  async execute({
    slug,
    name,
    description,
  }: Pick<IForumCategory, 'name' | 'slug' | 'description'>): Promise<void> {
    const existingForumCategory = await prisma.forumCategory.findFirst({
      where: {
        slug,
      },
    })

    if (!existingForumCategory) {
      throw new NotFoundError('forumCategory', 'Forum Category not found')
    }

    await prisma.forumCategory.update({
      where: { id: existingForumCategory.id },
      data: {
        name,
        slug: createSlug(name),
        description,
      },
    })
  }
}
