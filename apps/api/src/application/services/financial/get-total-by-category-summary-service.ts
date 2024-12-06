import { prisma } from '@/application/libs/prisma'

export class GetTotalCategorySummaryService {
  async execute({ slug }: { slug: string }) {
    const categories = await prisma.financialCategory.findMany({
      where: {
        transactions: {
          some: {
            condominium: {
              slug,
            },
          },
        },
      },
      include: {
        transactions: {
          select: { amount: true },
          // where: {
          //   dueDate: {
          //     gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          //     lt: new Date(
          //       new Date().getFullYear(),
          //       new Date().getMonth() + 1,
          //       1
          //     ),
          //   },
          // },
        },
      },
    })

    return categories.map((category) => ({
      name: category.name,
      type: category.type,
      total: category.transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      ),
    }))
  }
}
