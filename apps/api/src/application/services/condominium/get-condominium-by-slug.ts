import { prisma } from '@/application/libs/prisma'
import { ICondominium } from '@/application/schemas/ICondominium'

export class GetCondominiumBySlugService {
  async execute({ slug }: { slug: string }): Promise<{
    condominium: Pick<
      ICondominium,
      | 'id'
      | 'slug'
      | 'name'
      | 'address'
      | 'photo_url'
      | 'created_at'
      | 'updated_at'
    >
  }> {
    const condominium = await prisma.condominium.findFirst({
      where: {
        slug,
      },
      select: {
        id: true,
        slug: true,
        name: true,
        address: true,
        photo_url: true,
        created_at: true,
        updated_at: true,
      },
    })

    return {
      condominium: {
        ...condominium!,
        photo_url: condominium!.photo_url ?? undefined,
        address: {
          ...condominium!.address,
          complement: condominium!.address.complement ?? undefined,
        },
      },
    }
  }
}
