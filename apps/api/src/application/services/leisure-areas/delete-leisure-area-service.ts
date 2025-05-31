import { prisma } from '@/application/libs/prisma'

export class DeleteLeisureAreaService {
  async execute(id: string) {
    const leisureArea = await prisma.leisureArea.delete({
      where: { id },
    })

    return leisureArea
  }
}
