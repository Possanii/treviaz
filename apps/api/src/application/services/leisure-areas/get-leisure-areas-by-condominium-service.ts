import { prisma } from '@/application/libs/prisma'

export class GetLeisureAreasByCondominiumService {
  async execute(condominiumSlug: string) {
    const leisureArea = await prisma.leisureArea.findMany({
      where: {
        condominium: {
          slug: condominiumSlug,
        },
      },
    })

    return leisureArea
  }
}
