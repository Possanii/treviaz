import { IForumThread } from '@treviaz/entities/schemas/forum/IForumThread'
import { IUser } from '@treviaz/entities/schemas/IUser'

import { prisma } from '@/application/libs/prisma'

export class GetForumThreadsToApproveService {
  async execute({ slug }: { slug: string }): Promise<{
    threads: (IForumThread & {
      created_by: Pick<IUser, 'id' | 'name' | 'avatar_url'>
    })[]
  }> {
    const threads = await prisma.forumThread.findMany({
      where: {
        related_to_category: {
          condominium: {
            slug,
          },
        },
        status: 'PENDING',
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
