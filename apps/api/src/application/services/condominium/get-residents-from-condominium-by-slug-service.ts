import { IresidentsTable } from '@treviaz/entities/schemas/IresidentsTable'

import { prisma } from '@/application/libs/prisma'

export class GetResidentsFromCondominiumBySlugService {
  async execute({ slug }: { slug: string }): Promise<IresidentsTable> {
    const condominium = await prisma.condominium.findUnique({
      where: {
        slug,
      },
      select: {
        users: {
          where: {
            role: {
              name: 'RESIDENT'
            }
          },
          select: {
            joined_at: true,
            role: {
              select: {
                id: true,
                name: true,
                permissions: {
                  select: {
                    name: true
                  }
                }
              },
            },
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar_url: true,
              },
            },
          },
        },
      },
    })

    return {
      residents: condominium ? {
        users: condominium.users.map(userCondominium => ({
          joined_at: userCondominium.joined_at,
          role: userCondominium.role.name as "RESIDENT" | "ADMIN" | "SYNDIC" | "BILLING" | "SERVICES",
          user: userCondominium.user
        }))
      } : null
    }
  }
}
