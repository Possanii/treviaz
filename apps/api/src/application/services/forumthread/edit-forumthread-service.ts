import { IForumThread } from '@treviaz/entities/schemas/forum/IForumThread'

import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '@/application/libs/prisma'
import { createSlug } from '@/application/utils/create-slug'

export class EditForumThreadService {
  async execute({
    title,
    slug,
  }: Pick<IForumThread, 'title' | 'slug'>): Promise<void> {
    const thread = await prisma.forumThread.findFirst({
      where: {
        slug,
      },
    })

    if (!thread) {
      throw new NotFoundError('forumThread', 'Thread not found')
    }

    await prisma.forumThread.update({
      where: { id: thread.id },
      data: {
        title,
        slug: createSlug(title),
      },
    })
  }
}
