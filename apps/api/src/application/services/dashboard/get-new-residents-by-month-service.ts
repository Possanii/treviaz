import { prisma } from '@/application/libs/prisma'

export class GetNewResidentsByMonthService {
  async execute({ slug }: { slug: string }) {
    const totalNewresidents = await prisma.userCondominium.aggregate({
      _count: { _all: true },
      where: {
        condominium: {
          slug,
        },
        role: 'RESIDENT',
        // joined_at: {
        //   gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        //   lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        // },
      },
    })

    return totalNewresidents._count._all || 0
  }
}
