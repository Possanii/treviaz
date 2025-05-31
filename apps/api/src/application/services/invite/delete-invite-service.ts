import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'

import { prisma } from '../../libs/prisma'

export class DeleteInviteService {
  async execute(id: string): Promise<void> {
    const invite = await prisma.invite.findUnique({
      where: { id },
    })

    if (!invite) {
      throw new UnprocessableEntityError('invite', 'Invite not found')
    }

    await prisma.invite.delete({
      where: { id },
    })
  }
}
