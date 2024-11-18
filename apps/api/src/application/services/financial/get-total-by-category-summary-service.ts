import { prisma } from '@/application/libs/prisma'

export class GetTotalCategorySummaryService {
  async execute() {
    const categories = await prisma.financialCategory.findMany({
      include: {
        transactions: {
          select: { amount: true },
          where: {
            dueDate: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
              lt: new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                1
              ),
            },
          },
        },
      },
    })

    return categories.map((category) => ({
      name: category.name,
      total: category.transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      ),
    }))
  }
}