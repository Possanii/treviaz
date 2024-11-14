import { prisma } from '@/application/libs/prisma'

export class GetTotalIncomeByMonthService {
  async execute() {
    const income = await prisma.financialTransaction.aggregate({
      _sum: { amount: true },
      where: {
        category: { type: 'INCOME' },
        dueDate: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
      },
    })
    return income._sum.amount || 0
  }
}
