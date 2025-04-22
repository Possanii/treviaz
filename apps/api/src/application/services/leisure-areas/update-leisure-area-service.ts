import { ILeisureArea } from '@treviaz/entities/schemas/ILeisureArea'

import { prisma } from '@/application/libs/prisma'

export class UpdateLeisureAreaService {
  async execute(id: string, data: Partial<ILeisureArea>) {
    const leisureArea = await prisma.leisureArea.update({
      where: { id },
      data,
    })

    return leisureArea
  }
}
