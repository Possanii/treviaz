import { prisma } from '@/application/libs/prisma'

export class GetNewThreadsByMonthService {
  async execute({ slug }: { slug: string }) {
    const totalNewThreads = await prisma.forumThread.aggregate({
      _count: { _all: true },
      where: {
        related_to_category: {
          condominium: {
            slug,
          },
        },
        created_at: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
      },
    })

    return totalNewThreads._count._all || 0
  }
}
