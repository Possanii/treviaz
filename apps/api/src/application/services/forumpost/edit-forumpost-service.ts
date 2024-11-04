import { PrismaClient } from '@prisma/client'
import { IForumPost } from '@treviaz/entities/schemas/forum/IForumPost'

import { NotFoundError } from '@/application/errors/not-found-error'

const prisma = new PrismaClient()

export class EditForumPostService {
  async execute({
    id,
    content,
  }: Pick<IForumPost, 'id' | 'content'>): Promise<void> {
    const post = await prisma.forumPost.findUnique({
      where: { id },
    })

    if (!post) {
      throw new NotFoundError('forumPost', 'Post not found')
    }

    await prisma.forumPost.update({
      where: { id: post.id },
      data: { content },
    })
  }
}
