import { prisma } from '@/application/libs/prisma'
import { ICondominium } from '@/application/schemas/ICondominium'
import { IUserCondominium } from '@/application/schemas/IUserCondominium'

export class GetUserRelationshipCondominiumsService {
  async execute({ id }: { id: string }): Promise<
    (Pick<IUserCondominium, 'id' | 'joined_at'> & {
      role: string
      condominium: Pick<ICondominium, 'id' | 'name' | 'slug'>
    })[]
  > {
    const userCondominiums = await prisma.userCondominium.findMany({
      where: {
        user_id: id,
      },
      select: {
        id: true,
        joined_at: true,
        role: {
          select: {
            name: true,
          },
        },
        condominium: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        joined_at: 'desc',
      },
    })

    // Transform the data to match the expected return type
    return userCondominiums.map((uc) => ({
      id: uc.id,
      joined_at: uc.joined_at,
      role: uc.role.name, // Extract the role name from the role object
      condominium: uc.condominium,
    }))
  }
}
