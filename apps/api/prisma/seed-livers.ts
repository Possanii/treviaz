import { fakerPT_BR as faker } from '@faker-js/faker'

import { prisma } from '../src/application/libs/prisma'

async function seed() {
  const condominiumId = 'cd18c1ff-0f02-4056-9828-dc01eb8c8d23'
  const categoryId = 'd0d074f6-9db0-4f3b-8562-a00fb50e60c5'

  const resident = await prisma.user.create({
    data: {
      name: faker.internet.username(),
      email: faker.internet.email(),
      avatar_url: faker.image.avatar(),
      condominiums: {
        create: {
          condominium_id: condominiumId,
          role: 'RESIDENT',
        },
      },
    },
  })

  const invoceStatus = faker.helpers.arrayElement([
    'PAID',
    'OVERDUE',
    'PENDING',
  ])

  await prisma.financialTransaction.create({
    data: {
      categoryId,
      condominiumId,
      amount: 540,
      status: invoceStatus,
      paymentDate: new Date(),
      dueDate: new Date(
        new Date().setDate(
          new Date().getDate() - faker.number.int({ min: 1, max: 15 })
        )
      ),
      residentId: resident.id,
    },
  })

  const invoice1 = await prisma.invoice.create({
    data: {
      residentId: resident.id,
      totalAmount: 540,
      referenceMonth: new Date(),
    },
  })

  if (invoceStatus === 'PAID') {
    await prisma.payment.create({
      data: {
        amountPaid: 540,
        invoiceId: invoice1.id,
        paymentDate: new Date(),
        paymentMethod: faker.helpers.arrayElement(['CreditCard', 'Money']),
      },
    })
  }
}

async function main() {
  try {
    await Promise.all(Array.from({ length: 10 }).map(() => seed()))
    console.log('🔥 Database seeded!')
  } catch (error) {
    console.error('❌ Error seeding the database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
