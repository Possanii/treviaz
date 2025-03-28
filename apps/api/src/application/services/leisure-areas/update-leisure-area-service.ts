import { prisma } from "@/application/libs/prisma";

import { ILeisureArea } from "@/application/schemas/ILeisureArea";

export class UpdateLeisureAreaService {
  async execute(id: string, data: Partial<ILeisureArea>) {
    const leisureArea = await prisma.leisureArea.update({
      where: { id },
      data,
    })

    return leisureArea
  }
}