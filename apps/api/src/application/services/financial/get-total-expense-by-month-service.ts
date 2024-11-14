import { prisma } from '@/application/libs/prisma'

export class GetTotalExpenseByMonthService {
  async execute() {
    const expense = await prisma.financialTransaction.aggregate({
      _sum: { amount: true },
      where: {
        category: { type: 'EXPENSE' },
        dueDate: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
      },
    })
    return expense._sum.amount || 0
  }
}
