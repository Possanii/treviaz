import { IForumThread } from '@treviaz/entities/schemas/forum/IForumThread'
import { IUser } from '@treviaz/entities/schemas/IUser'

import { prisma } from '@/application/libs/prisma'

export class GetAllForumThreadsService {
  async execute({ slug }: { slug: string }): Promise<{
    threads: (IForumThread & {
      created_by: Pick<IUser, 'id' | 'name' | 'avatar_url'>
    })[]
  }> {
    const threads = await prisma.forumThread.findMany({
      where:
        slug !== 'all'
          ? {
              AND: {
                related_to_category: {
                  slug,
                },
                status: 'APPROVED',
              },
            }
          : {
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
