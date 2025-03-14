import { IForumPost } from '@treviaz/entities/schemas/forum/IForumPost'
import { IForumThread } from '@treviaz/entities/schemas/forum/IForumThread'

import { BadRequestError } from '@/application/errors/bad-request-error'
import { prisma } from '@/application/libs/prisma'
import { IUser } from '@/application/schemas/IUser'

export class CreateForumPostService {
  async execute({
    content,
    slug,
    threadSlug,
    id: userId,
  }: Pick<IForumPost, 'content'> &
    Pick<IForumThread, 'slug'> & { threadSlug: string } & Pick<
      IUser,
      'id'
    >): Promise<void> {
    const existingThread = await prisma.forumThread.findFirst({
      where: {
        slug: threadSlug,
        related_to_category: {
          condominium: {
            slug,
          },
        },
      },
    })

    if (!existingThread) {
      throw new BadRequestError('forumThread', 'Forum Thread does not exist')
    }

    await prisma.forumPost.create({
      data: {
        content,
        thread_id: existingThread.id,
        user_id: userId,
      },
    })
  }
}
