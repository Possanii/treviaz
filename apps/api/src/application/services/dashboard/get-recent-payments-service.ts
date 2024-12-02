import { prisma } from '@/application/libs/prisma'

export class GetRecentPaymentsService {
  async execute({ slug }: { slug: string }) {
    const recentPayments = await prisma.payment.findMany({
      where: {
        invoice: {
          resident: {
            condominiums: {
              some: {
                condominium: {
                  slug,
                },
              },
            },
          },
        },
        // paymentDate: {
        //   gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        //   lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        // },
      },
      select: {
        id: true,
        amountPaid: true,
        paymentDate: true,
        paymentMethod: true,
        invoice: {
          select: {
            resident: {
              select: {
                id: true,
                avatar_url: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    const formattedPayments = recentPayments.map((payment) => ({
      id: payment.id,
      amountPaid: payment.amountPaid,
      paymentDate: payment.paymentDate,
      paymentMethod: payment.paymentMethod,
      payer: payment.invoice.resident,
    }))

    return formattedPayments
  }
}
