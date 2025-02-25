import { IUser } from '@treviaz/entities/schemas/IUser'

import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '@/application/libs/prisma'

export class GetMeService {
  async execute({ id }: { id: string }): Promise<IUser> {
    const user = await prisma.user.findUnique({
      where: {
        keycloak_id: id,
      },
    })

    if (!user) {
      throw new NotFoundError('user', 'Get me not found.')
    }

    return user
  }
}
