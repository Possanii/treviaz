import { prisma } from "@/application/libs/prisma";

import { ILeisureArea } from "@/application/schemas/ILeisureArea";

export class EditLeisureAreaService {
  async execute(id: string, data: any) {
    const leisureArea = await prisma.leisureArea.update({
      where: { id },
      data,
    })

    return leisureArea
  }
}