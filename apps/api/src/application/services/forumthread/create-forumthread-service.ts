import { IForumThread } from '@treviaz/entities/schemas/forum/IForumThread'
import { ICondominium } from '@treviaz/entities/schemas/ICondominium'
import { IUser } from '@treviaz/entities/schemas/IUser'

import { BadRequestError } from '@/application/errors/bad-request-error'
import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '@/application/libs/prisma'
import { createSlug } from '@/application/utils/create-slug'

export class CreateForumThreadService {
  async execute({
    title,
    slug,
    id,
  }: Pick<IForumThread, 'title'> &
    Pick<ICondominium, 'slug'> &
    Pick<IUser, 'id'>): Promise<void> {
    const existingForumThread = await prisma.forumThread.findFirst({
      where: {
        AND: {
          title,
          related_to_category: {
            slug,
          },
        },
      },
    })

    if (existingForumThread) {
      throw new BadRequestError(
        'forumThread',
        'Forum Thread with this title in the given category already exists'
      )
    }

    const category = await prisma.forumCategory.findFirst({
      where: {
        slug,
      },
    })

    if (!category) {
      throw new NotFoundError(
        'forumCategory',
        'Invalid forum category. Not found.'
      )
    }

    await prisma.forumThread.create({
      data: {
        title,
        slug: createSlug(title),
        status: 'PENDING',
        related_to_category_id: category.id,
        created_by_user_id: id,
      },
    })
  }
}
