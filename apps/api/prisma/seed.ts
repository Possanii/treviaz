import { faker } from '@faker-js/faker'

import { prisma } from '../src/application/libs/prisma'

async function seed() {
  // prisma.$transaction([
  //   prisma.financialCategory.deleteMany(),
  //   prisma.financialTransaction.deleteMany(),
  // ])

  const owner = await prisma.user.create({
    data: {
      name: 'Treviaz',
      email: 'treviaz@acme.com',
      avatar_url: faker.image.avatar(),
    },
  })

  const resident = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@acme.com',
      avatar_url: faker.image.avatar(),
    },
  })

  const address = await prisma.address.create({
    data: {
      street: faker.location.street(),
      number: faker.location.buildingNumber(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip_code: faker.location.zipCode(),
      neighborhood: faker.location.continent(),
      country: faker.location.country(),
    },
  })

  const condominium = await prisma.condominium.create({
    data: {
      name: 'John Acme',
      slug: 'john-acme',
      owner_id: owner.id,
      address_id: address.id,
    },
  })

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
        condominiumId: condominium.id,
        amount: 15000,
        status: 'PENDING',
        dueDate: new Date(),
      },
      {
        categoryId: categorie2.id,
        condominiumId: condominium.id,
        amount: 120,
        status: 'OVERDUE',
        dueDate: new Date(),
      },
      {
        categoryId: categorie3.id,
        condominiumId: condominium.id,
        amount: 150,
        status: 'PAID',
        paymentDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() - 3)), // less 3 days
      },
      {
        categoryId: categorie4.id,
        condominiumId: condominium.id,
        amount: 540,
        status: 'PAID',
        paymentDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() - 5)), // less 3 days
        residentId: resident.id,
      },
    ],
  })

  const invoice1 = await prisma.invoice.create({
    data: {
      residentId: resident.id,
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
