import { fakerPT_BR as faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

import { KeycloakService } from '../src/application/services/auth/keycloak-service'
import { createSlug } from '../src/application/utils/create-slug'

const prisma = new PrismaClient()

async function main() {
  // Check if roles exist first
  let adminRole = await prisma.role.findFirst({
    where: { name: 'ADMIN' },
  })

  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        name: 'ADMIN',
        description: 'Administrator role with full access',
      },
    })
  }

  let residentRole = await prisma.role.findFirst({
    where: { name: 'RESIDENT' },
  })

  if (!residentRole) {
    residentRole = await prisma.role.create({
      data: {
        name: 'RESIDENT',
        description: 'Regular resident role',
      },
    })
  }

  let syndicRole = await prisma.role.findFirst({
    where: { name: 'SYNDIC' },
  })

  if (!syndicRole) {
    syndicRole = await prisma.role.create({
      data: {
        name: 'SYNDIC',
        description: 'Syndic role',
      },
    })
  }

  // Create permissions for admin role
  const createInvitePermission = await prisma.permission.findFirst({
    where: { name: 'CREATE_INVITE' },
  })

  if (!createInvitePermission) {
    await prisma.permission.create({
      data: {
        name: 'CREATE_INVITE',
        description: 'Can create invites',
        roles: {
          connect: { id: adminRole.id },
        },
      },
    })
  }

  const manageUsersPermission = await prisma.permission.findFirst({
    where: { name: 'MANAGE_USERS' },
  })

  if (!manageUsersPermission) {
    await prisma.permission.create({
      data: {
        name: 'MANAGE_USERS',
        description: 'Can manage users',
        roles: {
          connect: { id: adminRole.id },
        },
      },
    })
  }

  // Create permissions for resident role
  const viewForumPermission = await prisma.permission.findFirst({
    where: { name: 'VIEW_FORUM' },
  })

  if (!viewForumPermission) {
    await prisma.permission.create({
      data: {
        name: 'VIEW_FORUM',
        description: 'Can view forum posts',
        roles: {
          connect: { id: residentRole.id },
        },
      },
    })
  }

  const createForumPostPermission = await prisma.permission.findFirst({
    where: { name: 'CREATE_FORUM_POST' },
  })

  if (!createForumPostPermission) {
    await prisma.permission.create({
      data: {
        name: 'CREATE_FORUM_POST',
        description: 'Can create forum posts',
        roles: {
          connect: { id: residentRole.id },
        },
      },
    })
  }

  // Create permissions for syndic role
  const manageCondominiumPermission = await prisma.permission.findFirst({
    where: { name: 'MANAGE_CONDOMINIUM' },
  })

  if (!manageCondominiumPermission) {
    await prisma.permission.create({
      data: {
        name: 'MANAGE_CONDOMINIUM',
        description: 'Can manage condominium settings',
        roles: {
          connect: { id: syndicRole.id },
        },
      },
    })
  }

  const approvePostsPermission = await prisma.permission.findFirst({
    where: { name: 'APPROVE_POSTS' },
  })

  if (!approvePostsPermission) {
    await prisma.permission.create({
      data: {
        name: 'APPROVE_POSTS',
        description: 'Can approve forum posts',
        roles: {
          connect: { id: syndicRole.id },
        },
      },
    })
  }

  // Create owner user
  const ownerData = {
    name: 'Treviaz Acme',
    email: 'treviaz@acme.com',
  }

  const keycloakService = new KeycloakService()

  await keycloakService.createUser({
    email: ownerData.email,
    password: 'Qwert2025!',
    firstName: ownerData.name.split(' ')[0],
    lastName: ownerData.name.split(' ')[1],
    enabled: true,
    emailVerified: false,
  })

  // Get the Keycloak user to get their ID
  const keycloakOwner = await keycloakService.getUserByEmail(ownerData.email)

  const owner = await prisma.user.create({
    data: {
      ...ownerData,
      keycloak_id: keycloakOwner.id,
      avatar_url: faker.image.avatar(),
    },
  })

  const residents = Array.from({
    length: 10,
  }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    keycloak_id: faker.string.uuid(),
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
    data: [
      ...residents.map((resident) => ({
        condominium_id: condominium.id,
        user_id: resident.id,
        role_id: residentRole.id,
      })),
      {
        condominium_id: condominium.id,
        user_id: owner.id,
        role_id: adminRole.id,
      },
    ],
  })

  await prisma.userUnit.createMany({
    data: residents.map((resident, index) => ({
      unitId: units[index].id,
      userId: resident.id,
    })),
  })

  // First check if they exist
  let rentCategory: any

  rentCategory = await prisma.financialCategory.findFirst({
    where: { name: 'Rent' },
  })

  if (!rentCategory) {
    rentCategory = await prisma.financialCategory.create({
      data: {
        name: 'Rent',
        type: 'EXPENSE',
        description: 'Monthly rent payment',
      },
    })
  }

  let maintenanceCategory: any

  maintenanceCategory = await prisma.financialCategory.findFirst({
    where: { name: 'Maintenance' },
  })

  if (!maintenanceCategory) {
    maintenanceCategory = await prisma.financialCategory.create({
      data: {
        name: 'Maintenance',
        type: 'EXPENSE',
        description: 'Building maintenance',
      },
    })
  }

  let condoFeeCategory: any

  condoFeeCategory = await prisma.financialCategory.findFirst({
    where: { name: 'Condominium Fee' },
  })

  if (!condoFeeCategory) {
    condoFeeCategory = await prisma.financialCategory.create({
      data: {
        name: 'Condominium Fee',
        type: 'INCOME',
        description: 'Monthly condominium fee',
      },
    })
  }

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
      categoryId: condoFeeCategory.id,
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
        categoryId: rentCategory.id,
        condominiumId: condominium.id,
        amount: 15000,
        status: 'PENDING',
        dueDate: new Date(),
      },
      {
        categoryId: maintenanceCategory.id,
        condominiumId: condominium.id,
        amount: 120,
        status: 'OVERDUE',
        dueDate: new Date(),
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
      description: faker.lorem.paragraphs({ min: 1, max: 3 }),
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

  await prisma.delivery.createMany({
    data: Array.from({ length: 25 }).map(() => ({
      user_id: faker.helpers.arrayElement(residents).id,
      condominium_id: condominium.id,
      status: faker.helpers.arrayElement(['PENDING', 'DELIVERED', 'CANCELLED']),
    })),
  })

  const pollLeasureArea = await prisma.leisureArea.create({
    data: {
      name: 'Piscina',
      description: 'Piscina aquecida com área de lazer',
      photo_url: faker.image.url(),
      condominiumId: condominium.id,
    },
  })

  const barbecueLeasureArea = await prisma.leisureArea.create({
    data: {
      name: 'Churrasqueira',
      description: 'Churrasqueira com área de lazer',
      photo_url: faker.image.url(),
      condominiumId: condominium.id,
    },
  })

  await prisma.reserve.createMany({
    data: Array.from({ length: 25 }).map(() => {
      const startDate = faker.date.future({ years: 0.1 })

      const hoursInDayOfStartDate = startDate.getHours()
      const maxHoursCanAdd = 23 - hoursInDayOfStartDate

      const hoursToAdd = faker.number.int({
        min: 1,
        max: Math.min(4, Math.max(1, maxHoursCanAdd)),
      })

      const endDate = new Date(startDate.getTime())
      endDate.setHours(startDate.getHours() + hoursToAdd)

      return {
        title: faker.lorem.words({ min: 2, max: 4 }),
        start_date: startDate,
        end_date: endDate,
        status: faker.helpers.arrayElement([
          'PENDING',
          'APPROVED',
          'REJECTED',
          'CANCELLED',
        ]),
        user_id: faker.helpers.arrayElement(residents).id,
        leisureAreaId: faker.helpers.arrayElement([
          pollLeasureArea.id,
          barbecueLeasureArea.id,
        ]),
      }
    }),
  })

  console.log('🔥 Database seed completed!')
}

main()
  .catch((error) => {
    console.error('Error seeding database: ', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
