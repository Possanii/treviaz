import { prisma } from '@/application/libs/prisma'
import { NotFoundError } from '@/application/errors/not-found-error'

export class GetUserByKeycloakIdService {
  async execute(keycloakId: string) {
    const user = await prisma.user.findUnique({
      where: { keycloak_id: keycloakId },
      include: {
        condominiums: {
          include: {
            role: {
              include: {
                permissions: true,
              },
            },
            condominium: true,
          },
        },
      },
    })

    if (!user) {
      throw new NotFoundError('user', 'User not found')
    }

    return user
  }
}
