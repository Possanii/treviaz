import { IForumPost } from '@treviaz/entities/schemas/forum/IForumPost'
import { IForumThread } from '@treviaz/entities/schemas/forum/IForumThread'
import { IUser } from '@treviaz/entities/schemas/IUser'

import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '@/application/libs/prisma'

export class GetForumThreadBySlugService {
  async execute({
    slug,
    threadSlug,
  }: {
    slug: string
    threadSlug: string
  }): Promise<{
    thread: IForumThread & {
      created_by: Pick<IUser, 'id' | 'name' | 'avatar_url'>
      posts: (IForumPost & {
        user: Pick<IUser, 'id' | 'name' | 'avatar_url'>
      })[]
    }
  }> {
    const thread = await prisma.forumThread.findFirst({
      where: {
        related_to_category: {
          condominium: {
            slug,
          },
        },
        slug: threadSlug,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        thumbnail_url: true,
        status: true,
        created_at: true,
        updated_at: true,
        created_by: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
        posts: {
          select: {
            id: true,
            content: true,
            created_at: true,
            updated_at: true,
            user: {
              select: {
                id: true,
                name: true,
                avatar_url: true,
              },
            },
          },
        },
      },
    })

    if (!thread) {
      throw new NotFoundError('forumthread', 'Forum thread not found.')
    }

    return { thread }
  }
}
