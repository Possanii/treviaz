import { fakerPT_BR as faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  const condominium = await prisma.condominium.findFirst()
  const role = await prisma.role.findFirst({
    where: {
      name: 'RESIDENT',
    },
  })
  const category = await prisma.financialCategory.findFirst({
    where: {
      name: 'Condominium Fee',
    },
  })

  const resident = await prisma.user.create({
    data: {
      name: faker.internet.username(),
      email: faker.internet.email(),
      avatar_url: faker.image.avatar(),
      keycloak_id: faker.string.uuid(),
      condominiums: {
        create: {
          condominium_id: condominium.id,
          role_id: role.id,
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
      id: faker.string.uuid(),
      categoryId: category.id,
      condominiumId: condominium.id,
      amount: 540,
      status: invoceStatus,
      paymentDate: invoceStatus === 'PAID' ? new Date() : null,
      dueDate:
        invoceStatus === 'PENDING'
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
    },
  })

  const invoice1 = await prisma.invoice.create({
    data: {
      residentId: resident.id,
      totalAmount: 540,
      referenceMonth: new Date(),
      status: invoceStatus,
    },
  })

  if (invoceStatus === 'PAID') {
    await prisma.payment.create({
      data: {
        amountPaid: 540,
        invoiceId: invoice1.id,
        paymentDate: new Date(),
        paymentMethod: faker.helpers.arrayElement([
          'CREDIT_CARD',
          'BANK_SLIP',
          'PIX',
        ]),
      },
    })
  }
}

async function main() {
  try {
    await Promise.all(Array.from({ length: 10 }).map(() => seed()))
    console.log('🔥 Residents seeded!')
  } catch (error) {
    console.error('❌ Error seeding residents:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
