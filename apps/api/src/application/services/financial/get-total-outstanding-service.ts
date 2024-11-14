import { prisma } from '@/application/libs/prisma'

export class GetTotalOutstandingService {
  async execute() {
    const outstanding = await prisma.financialTransaction.aggregate({
      _sum: { amount: true },
      where: {
        status: { in: ['PENDING', 'OVERDUE'] },
      },
    })
    return outstanding._sum.amount || 0
  }
}
