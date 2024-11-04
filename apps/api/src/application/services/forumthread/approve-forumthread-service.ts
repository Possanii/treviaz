import { IForumThread } from '@treviaz/entities/schemas/forum/IForumThread'
import { IUser } from '@treviaz/entities/schemas/IUser'

import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '@/application/libs/prisma'

export class ApproveForumThreadService {
  async execute({
    slug,
    id,
  }: Pick<IForumThread, 'slug'> & Pick<IUser, 'id'>): Promise<void> {
    const thread = await prisma.forumThread.findFirst({
      where: { slug },
    })

    if (!thread) {
      throw new NotFoundError('forumThread', 'Thread not found')
    }

    await prisma.forumThread.update({
      where: { id: thread.id },
      data: {
        status: 'APPROVED',
        approved_by_user_id: id,
      },
    })
  }
}
