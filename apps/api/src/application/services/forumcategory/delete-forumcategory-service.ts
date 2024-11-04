import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { prisma } from '@/application/libs/prisma'

export class DeleteForumCategoryService {
  async execute({ slug }: { slug: string }): Promise<void> {
    const forumCategory = await prisma.forumCategory.findFirst({
      where: { slug },
    })

    if (!forumCategory) {
      throw new UnprocessableEntityError(
        'forumCategory',
        'Forum Category not found'
      )
    }

    // WARNING: WE CAN CONFIGURE ON DATABASE TO DELETE CASCADE
    // await prisma.$transaction(async (prisma) => {
    //   // Delete all posts in threads in the category
    //   await prisma.forumPost.deleteMany({
    //     where: {
    //       thread: {
    //         category_id: id,
    //       },
    //     },
    //   })

    //   // Delete all threads in the category
    //   await prisma.forumThread.deleteMany({
    //     where: { category_id: id },
    //   })

    // Finally, delete the forum category itself
    await prisma.forumCategory.delete({
      where: { id: forumCategory.id },
    })
    // })
  }
}
