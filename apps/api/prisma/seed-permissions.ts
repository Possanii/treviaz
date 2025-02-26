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
  // Check if roles exist first
  let adminRole = await prisma.role.findFirst({
    where: { name: 'ADMIN' }
  })

  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        name: 'ADMIN',
        description: 'Administrator role with full access',
      }
    })
  }

  let residentRole = await prisma.role.findFirst({
    where: { name: 'RESIDENT' }
  })

  if (!residentRole) {
    residentRole = await prisma.role.create({
      data: {
        name: 'RESIDENT',
        description: 'Regular resident role',
      }
    })
  }

  let syndicRole = await prisma.role.findFirst({
    where: { name: 'SYNDIC' }
  })

  if (!syndicRole) {
    syndicRole = await prisma.role.create({
      data: {
        name: 'SYNDIC',
        description: 'Syndic role',
      }
    })
  }

  // Create permissions for admin role
  const createInvitePermission = await prisma.permission.findFirst({
    where: { name: 'CREATE_INVITE' }
  })
  
  if (!createInvitePermission) {
    await prisma.permission.create({
      data: {
        name: 'CREATE_INVITE',
        description: 'Can create invites',
        roles: {
          connect: { id: adminRole.id }
        }
      }
    })
  }

  const manageUsersPermission = await prisma.permission.findFirst({
    where: { name: 'MANAGE_USERS' }
  })
  
  if (!manageUsersPermission) {
    await prisma.permission.create({
      data: {
        name: 'MANAGE_USERS',
        description: 'Can manage users',
        roles: {
          connect: { id: adminRole.id }
        }
      }
    })
  }

  // Create permissions for resident role
  const viewForumPermission = await prisma.permission.findFirst({
    where: { name: 'VIEW_FORUM' }
  })
  
  if (!viewForumPermission) {
    await prisma.permission.create({
      data: {
        name: 'VIEW_FORUM',
        description: 'Can view forum posts',
        roles: {
          connect: { id: residentRole.id }
        }
      }
    })
  }

  const createForumPostPermission = await prisma.permission.findFirst({
    where: { name: 'CREATE_FORUM_POST' }
  })
  
  if (!createForumPostPermission) {
    await prisma.permission.create({
      data: {
        name: 'CREATE_FORUM_POST',
        description: 'Can create forum posts',
        roles: {
          connect: { id: residentRole.id }
        }
      }
    })
  }

  // Create permissions for syndic role
  const manageCondominiumPermission = await prisma.permission.findFirst({
    where: { name: 'MANAGE_CONDOMINIUM' }
  })
  
  if (!manageCondominiumPermission) {
    await prisma.permission.create({
      data: {
        name: 'MANAGE_CONDOMINIUM',
        description: 'Can manage condominium settings',
        roles: {
          connect: { id: syndicRole.id }
        }
      }
    })
  }

  const approvePostsPermission = await prisma.permission.findFirst({
    where: { name: 'APPROVE_POSTS' }
  })
  
  if (!approvePostsPermission) {
    await prisma.permission.create({
      data: {
        name: 'APPROVE_POSTS',
        description: 'Can approve forum posts',
        roles: {
          connect: { id: syndicRole.id }
        }
      }
    })
  }

  // Create owner user
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

  // Create condominium with slug
  const condominiumName = 'Sample Condominium'
  const slug = createSlug(condominiumName)

  // Create condominium
  const condominium = await prisma.condominium.upsert({
    where: { slug },
    update: {},
    create: {
      name: condominiumName,
      slug: slug,
      address_id: address.id,
    },
  })

  // Check if user-condominium relationship already exists
  const existingUserCondo = await prisma.userCondominium.findFirst({
    where: {
      user_id: owner.id,
      condominium_id: condominium.id,
    }
  })

  // Associate owner with condominium as admin if not already associated
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
    where: { name: 'Rent' }
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
    where: { name: 'Maintenance' }
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
    where: { name: 'Condominium Fee' }
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

  console.log('🔥 Permissions seed completed!')
}

main()
  .catch((error) => {
    console.error('Error seeding permissions:', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
