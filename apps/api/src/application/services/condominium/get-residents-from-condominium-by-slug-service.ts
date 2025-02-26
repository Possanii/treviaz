import { IresidentsTable } from '@treviaz/entities/schemas/IresidentsTable'

import { prisma } from '@/application/libs/prisma'

export class GetResidentsFromCondominiumBySlugService {
  async execute({ slug }: { slug: string }): Promise<IresidentsTable> {
    const residents = await prisma.condominium.findUnique({
      where: {
        slug,
      },
      select: {
        users: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar_url: true,
              },
            },
            joined_at: true,
            role: true,
          },
        },
      },
    })

    return { residents }
  }
}
