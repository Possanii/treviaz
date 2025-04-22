import { ILeisureArea } from '@treviaz/entities/schemas/ILeisureArea'

import { prisma } from '@/application/libs/prisma'

export class CreateLeisureAreaService {
  async execute({
    name,
    description,
    photo_url: photoUrl,
    condominiumSlug,
  }: Omit<ILeisureArea, 'id' | 'createdAt'> & { condominiumSlug: string }) {
    const leisureArea = await prisma.leisureArea.create({
      data: {
        name,
        description,
        photo_url: photoUrl,
        condominium: {
          connect: {
            slug: condominiumSlug,
          },
        },
      },
    })
    return leisureArea
  }
}
