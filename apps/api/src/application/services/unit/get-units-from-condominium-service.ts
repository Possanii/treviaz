import { prisma } from '@/application/libs/prisma'
import { IUnit } from '@/application/schemas/IUnit'

export class GetUnitsFromCondominiumService {
  async execute({
    condominiumSlug,
  }: {
    condominiumSlug: string
  }): Promise<IUnit[]> {
    return await prisma.unit.findMany({
      where: {
        condominium: {
          slug: condominiumSlug,
        },
      },
    })
  }
}
