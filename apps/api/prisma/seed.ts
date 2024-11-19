import { prisma } from '../src/application/libs/prisma'

async function seed() {
  const condominiumId = 'cd18c1ff-0f02-4056-9828-dc01eb8c8d23'
  const residentId = '04737ae5-b496-4342-af41-cd68acb9d65b'

  // prisma.$transaction([
  //   prisma.financialCategory.deleteMany(),
  //   prisma.financialTransaction.deleteMany(),
  // ])

  const categorie1 = await prisma.financialCategory.create({
    data: {
      name: 'Aluguel',
      type: 'EXPENSE',
      description: 'Pagamento alguel mensal',
    },
  })

  const categorie2 = await prisma.financialCategory.create({
    data: {
      name: 'Jardineiro',
      type: 'EXPENSE',
      description: 'Pagamento jardineiro mensal',
    },
  })

  const categorie3 = await prisma.financialCategory.create({
    data: {
      name: 'Piscineiro',
      type: 'EXPENSE',
      description: 'Pagamento piscineiro mensal',
    },
  })

  const categorie4 = await prisma.financialCategory.create({
    data: {
      name: 'Condominio',
      type: 'INCOME',
      description: 'Pagamento condominio mensal',
    },
  })

  await prisma.financialTransaction.createMany({
    data: [
      {
        categoryId: categorie1.id,
        condominiumId,
        amount: 15000,
        status: 'PENDING',
        dueDate: new Date(),
      },
      {
        categoryId: categorie2.id,
        condominiumId,
        amount: 120,
        status: 'OVERDUE',
        dueDate: new Date(),
      },
      {
        categoryId: categorie3.id,
        condominiumId,
        amount: 150,
        status: 'PAID',
        paymentDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() - 3)), // less 3 days
      },
      {
        categoryId: categorie4.id,
        condominiumId,
        amount: 540,
        status: 'PAID',
        paymentDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() - 5)), // less 3 days
        residentId,
      },
    ],
  })

  const invoice1 = await prisma.invoice.create({
    data: {
      residentId,
      totalAmount: 540,
      referenceMonth: new Date(),
    },
  })

  await prisma.payment.createMany({
    data: [
      {
        amountPaid: 540,
        invoiceId: invoice1.id,
        paymentDate: new Date(),
        paymentMethod: 'CreditCard',
      },
    ],
  })
}

seed().then(() => {
  console.log('🔥 Database seeded!')
})
