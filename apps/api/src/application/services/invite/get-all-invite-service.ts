import { ICondominiumInvitesTable } from '@treviaz/entities/schemas/tables/ICondominium-invites-table'

import { prisma } from '@/application/libs/prisma'

export class GetAllInvitesService {
  async execute({
    slug,
  }: {
    slug: string
  }): Promise<ICondominiumInvitesTable[]> {
    const invites = await prisma.invite.findMany({
      where: {
        condominium: {
          slug,
        },
      },
      select: {
        id: true,
        email: true,
        status: true,
        sent_at: true,
        expires_at: true,
        role: true,
        author: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
            condominiums: {
              where: {
                condominium: {
                  slug,
                },
              },
              select: {
                id: true,
                role: true,
              },
            },
          },
        },
      },
    })

    return invites
  }
}
