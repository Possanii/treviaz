import { prisma } from "@/application/libs/prisma";

export class GetLeisureAreasByCondominiumService {
  async execute(condominiumId: string) {
    const leisureArea = await prisma.leisureArea.findMany({
      where: { condominiumId },
    })

    return leisureArea
  }
}