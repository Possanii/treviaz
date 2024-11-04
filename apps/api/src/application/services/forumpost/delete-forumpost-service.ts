import { PrismaClient } from '@prisma/client'

import { NotFoundError } from '@/application/errors/not-found-error'

const prisma = new PrismaClient()

export class DeleteForumPostService {
  async execute({ postId }: { postId: string }): Promise<void> {
    const post = await prisma.forumPost.findUnique({
      where: { id: postId },
    })

    if (!post) {
      throw new NotFoundError('forumPost', 'Post not found')
    }

    await prisma.forumPost.delete({
      where: { id: postId },
    })
  }
}
