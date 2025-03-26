import { prisma } from "@/application/libs/prisma";
import { ILeisureArea } from "@/application/schemas/ILeisureArea";
export class CreateLeisureAreaService {
  async execute({ name, description, condominiumId }: ILeisureArea) {
    const leisureArea = await prisma.leisureArea.create({
      data: {
        name,
        description,
        condominium: {
          connect: {
            id: condominiumId
          }
        }
      }
    })
    return leisureArea
  }
}