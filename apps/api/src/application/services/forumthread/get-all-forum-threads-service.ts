import { IForumThread } from '@treviaz/entities/schemas/forum/IForumThread'
import { IUser } from '@treviaz/entities/schemas/IUser'

import { prisma } from '@/application/libs/prisma'

export class GetAllForumThreadsService {
  async execute({
    condSlug,
    categorySlug,
  }: {
    condSlug: string
    categorySlug: string
  }): Promise<{
    threads: (IForumThread & {
      created_by: Pick<IUser, 'id' | 'name' | 'avatar_url'>
    })[]
  }> {
    const threads = await prisma.forumThread.findMany({
      where:
        categorySlug !== 'all'
          ? {
              AND: {
                related_to_category: {
                  slug: categorySlug,
                  condominium: {
                    slug: condSlug,
                  },
                },
                status: 'APPROVED',
              },
            }
          : {
              related_to_category: {
                condominium: {
                  slug: condSlug,
                },
              },
              status: 'APPROVED',
            },
      include: {
        created_by: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
      },
    })

    return { threads }
  }
}
