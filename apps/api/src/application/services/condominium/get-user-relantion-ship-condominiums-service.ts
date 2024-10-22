import { prisma } from '@/application/libs/prisma'
import { ICondominium } from '@/application/schemas/ICondominium'
import { IUserCondominium } from '@/application/schemas/IUserCondominium'

export class GetUserRelantionShipCondominiumsService {
  async execute({ id }: { id: string }): Promise<
    (Pick<IUserCondominium, 'id' | 'role' | 'joined_at'> & {
      condominium: Pick<ICondominium, 'id' | 'name' | 'slug'>
    })[]
  > {
    const userCondominiums = await prisma.userCondominium.findMany({
      where: {
        user_id: id,
      },
      select: {
        id: true,
        role: true,
        joined_at: true,
        condominium: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    return userCondominiums
  }
}
