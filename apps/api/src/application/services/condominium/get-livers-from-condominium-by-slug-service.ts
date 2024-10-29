import { ILiversTable } from '@treviaz/entities/schemas/ILiversTable'

import { prisma } from '@/application/libs/prisma'

export class GetLiversFromCondominiumBySlugService {
  async execute({ slug }: { slug: string }): Promise<ILiversTable> {
    const livers = await prisma.condominium.findUnique({
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

    return { livers }
  }
}
