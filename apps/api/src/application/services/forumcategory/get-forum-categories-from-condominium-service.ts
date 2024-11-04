import { IForumCategory } from '@treviaz/entities/schemas/forum/IForumCategory'
import { IUser } from '@treviaz/entities/schemas/IUser'

import { prisma } from '@/application/libs/prisma'

export class GetForumCategoriesFromCondominiumService {
  async execute({ slug }: { slug: string }): Promise<{
    categories: (IForumCategory & {
      created_by: Pick<IUser, 'id' | 'name' | 'avatar_url'>
    })[]
  }> {
    const categories = await prisma.forumCategory.findMany({
      where: {
        condominium: {
          slug,
        },
      },
      include: {
        created_by: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
      },
    })

    return { categories }
  }
}
