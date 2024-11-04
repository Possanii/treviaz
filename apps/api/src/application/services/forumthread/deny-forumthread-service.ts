import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '@/application/libs/prisma'

export class DenyForumThreadService {
  async execute(slug: string): Promise<void> {
    const thread = await prisma.forumThread.findFirst({
      where: { slug },
    })

    if (!thread) {
      throw new NotFoundError('forumThread', 'Thread not found')
    }

    await prisma.forumThread.update({
      where: { id: thread.id },
      data: {
        status: 'DENIED',
      },
    })
  }
}
