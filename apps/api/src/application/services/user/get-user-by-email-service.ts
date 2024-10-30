import { IUser } from '@treviaz/entities/schemas/IUser'

import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '@/application/libs/prisma'

export class GetUserByEmailService {
  async execute({ email }: { email: string }): Promise<IUser> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new NotFoundError('user', 'User by email not found.')
    }

    return user
  }
}
