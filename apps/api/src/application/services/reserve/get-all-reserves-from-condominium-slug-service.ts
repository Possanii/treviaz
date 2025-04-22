import { prisma } from '@/application/libs/prisma'

export class GetAllReservesFromCondominiumSlugService {
  async execute(condominiumSlug: string) {
    const reserve = await prisma.reserve.findMany({
      where: {
        leisureArea: {
          condominium: {
            slug: condominiumSlug,
          },
        },
      },
      include: {
        leisureArea: {
          select: {
            photo_url: true,
          },
        },
        user: {
          select: {
            id: true,
            avatar_url: true,
            name: true,
          },
        },
      },
    })

    return reserve
  }
}
