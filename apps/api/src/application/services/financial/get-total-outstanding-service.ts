import { prisma } from '@/application/libs/prisma'

export class GetTotalOutstandingService {
  async execute({ slug }: { slug: string }) {
    const outstanding = await prisma.financialTransaction.aggregate({
      _sum: { amount: true },
      where: {
        condominium: {
          slug,
        },
        status: { in: ['PENDING', 'OVERDUE'] },
      },
    })
    return outstanding._sum.amount || 0
  }
}
