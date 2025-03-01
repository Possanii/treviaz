import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper function to create a slug
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
}

async function main() {
  // Get the admin role that should have been created by seed-permissions.ts
  const adminRole = await prisma.role.findFirst({
    where: { name: 'ADMIN' },
  })

  if (!adminRole) {
    throw new Error(
      'Admin role not found. Please run seed-permissions.ts first.'
    )
  }

  // Create or update owner user
  const owner = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      keycloak_id: faker.string.uuid(),
      avatar_url: faker.image.avatar(),
    },
  })

  // Create address
  const address = await prisma.address.create({
    data: {
      street: faker.location.street(),
      number: faker.location.buildingNumber(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip_code: faker.location.zipCode(),
      neighborhood: faker.location.county(),
      country: faker.location.country(),
    },
  })

  // Create condominium
  const condominiumName = 'Sample Condominium 2'
  const slug = createSlug(condominiumName)

  const condominium = await prisma.condominium.upsert({
    where: { slug },
    update: {},
    create: {
      name: condominiumName,
      slug,
      address_id: address.id,
    },
  })

  // Check if user-condominium relationship already exists
  const existingUserCondo = await prisma.userCondominium.findFirst({
    where: {
      user_id: owner.id,
      condominium_id: condominium.id,
    },
  })

  // Set owner through UserCondominium if not already set
  if (!existingUserCondo) {
    await prisma.userCondominium.create({
      data: {
        user_id: owner.id,
        condominium_id: condominium.id,
        role_id: adminRole.id,
      },
    })
  }

  // Create financial categories
  // First check if they exist
  const rentCategory = await prisma.financialCategory.findFirst({
    where: { name: 'Rent' },
  })

  if (!rentCategory) {
    await prisma.financialCategory.create({
      data: {
        name: 'Rent',
        type: 'EXPENSE',
        description: 'Monthly rent payment',
      },
    })
  }

  const maintenanceCategory = await prisma.financialCategory.findFirst({
    where: { name: 'Maintenance' },
  })

  if (!maintenanceCategory) {
    await prisma.financialCategory.create({
      data: {
        name: 'Maintenance',
        type: 'EXPENSE',
        description: 'Building maintenance',
      },
    })
  }

  const condoFeeCategory = await prisma.financialCategory.findFirst({
    where: { name: 'Condominium Fee' },
  })

  if (!condoFeeCategory) {
    await prisma.financialCategory.create({
      data: {
        name: 'Condominium Fee',
        type: 'INCOME',
        description: 'Monthly condominium fee',
      },
    })
  }

  console.log('🔥 Condominium seed completed!')
}

main()
  .catch((error) => {
    console.error('Error seeding condominium:', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
