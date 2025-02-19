import { faker } from '@faker-js/faker'

import { prisma } from '../src/application/libs/prisma'
import { createSlug } from '../src/application/utils/create-slug'

async function seed() {
  const owner = await prisma.user.create({
    data: {
      name: 'Treviaz',
      email: 'treviaz@acme.com',
      avatar_url: faker.image.avatar(),
    },
  })

  const residents = Array.from({
    length: 10,
  }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar_url: faker.image.avatar(),
  }))

  await prisma.user.createMany({
    data: residents,
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

  const units = Array.from({
    length: faker.helpers.rangeToNumber({ min: 10, max: 50 }),
  }).map(() => ({
    id: faker.string.uuid(),
    condominium_id: condominium.id,
    number: faker.location.buildingNumber(),
  }))

  await prisma.unit.createMany({
    data: units,
  })

  await prisma.userCondominium.createMany({
    data: residents.map((resident) => ({
      condominium_id: condominium.id,
      user_id: resident.id,
      role: 'RESIDENT',
    })),
  })

  await prisma.userUnit.createMany({
    data: residents.map((resident, index) => ({
      unitId: units[index].id,
      userId: resident.id,
    })),
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

  const invoices = residents.map((resident) => ({
    id: faker.string.uuid(),
    residentId: resident.id,
    totalAmount: 540,
    referenceMonth: new Date(),
    status: faker.helpers.arrayElement(['PAID', 'OVERDUE', 'PENDING']),
  }))

  await prisma.invoice.createMany({
    data: invoices,
  })

  const payments = residents.map((resident) => {
    const status = invoices.find(
      (invoice) => invoice.residentId === resident.id
    )!.status
    return {
      id: faker.string.uuid(),
      categoryId: categorie4.id,
      condominiumId: condominium.id,
      amount: 540,
      status,
      paymentDate: status === 'PAID' ? new Date() : null,
      dueDate:
        status === 'PENDING'
          ? new Date(
              new Date().setDate(
                new Date().getDate() +
                  faker.helpers.rangeToNumber({ min: 5, max: 30 })
              )
            )
          : new Date(
              new Date().setDate(
                new Date().getDate() -
                  faker.helpers.rangeToNumber({ min: 5, max: 30 })
              )
            ),
      residentId: resident.id,
    }
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
      ...payments,
    ],
  })

  await prisma.payment.createMany({
    data: payments
      .filter((payment) => payment.status === 'PAID')
      .map((payment) => ({
        amountPaid: 540,
        invoiceId: invoices.find(
          (invoice) => invoice.residentId === payment.residentId
        )!.id,
        paymentDate: new Date(),
        paymentMethod: faker.helpers.arrayElement([
          'CREDIT_CARD',
          'BANK_SLIP',
          'PIX',
        ]),
      })),
  })

  const forumCategories = Array.from({ length: 5 }).map(() => {
    const name = faker.lorem.word({ length: { min: 5, max: 8 } })

    return {
      id: faker.string.uuid(),
      name,
      description: faker.lorem.sentence(),
      slug: createSlug(name),
      condominium_id: condominium.id,
      created_by_user_id: owner.id,
    }
  })

  await prisma.forumCategory.createMany({
    data: forumCategories,
  })

  const forumThreads = Array.from({
    length: faker.helpers.rangeToNumber({ min: 10, max: 25 }),
  }).map(() => {
    const title = faker.lorem.words({ min: 3, max: 5 })
    const status = faker.helpers.arrayElement(['APPROVED', 'DENIED', 'PENDING'])
    return {
      id: faker.string.uuid(),
      created_by_user_id: faker.helpers.arrayElement(residents).id,
      description: faker.lorem.sentence(),
      related_to_category_id: faker.helpers.arrayElement(forumCategories).id,
      title,
      slug: createSlug(title),
      thumbnail_url: faker.image.url(),
      status,
      approved_by_user_id: owner.id,
    }
  })

  await prisma.forumThread.createMany({
    data: forumThreads,
  })

  forumThreads.map(async (thread) => {
    await prisma.forumPost.createMany({
      data: Array.from({
        length: faker.helpers.rangeToNumber({ min: 5, max: 15 }),
      }).map(() => ({
        user_id: faker.helpers.arrayElement(residents).id,
        thread_id: thread.id,
        content: faker.lorem.lines({ min: 1, max: 3 }),
      })),
    })
  })
}

seed().then(() => {
  console.log('🔥 Database seeded!')
})
