import { UnauthorizedError } from '@/application/errors/unauthorized-error'
import { IMiddleware } from '@/application/interfaces/IMiddleware'
import { IRequest } from '@/application/interfaces/IRequest'
import { prisma } from '@/application/libs/prisma'

export class CheckPermissionMiddleware implements IMiddleware {
  constructor(private permission: string) {}

  async handle(request: IRequest) {
    const userId = request.metadata?.user?.id
    const condominiumId = request.params.condominium_id || request.body.condominium_id

    if (!userId || !condominiumId) {
      throw new UnauthorizedError('User or condominium not found')
    }

    const userCondominium = await prisma.userCondominium.findFirst({
      where: {
        user_id: userId,
        condominium_id: condominiumId,
      },
      include: {
        role: {
          include: {
            permissions: true
          }
        }
      }
    })

    if (!userCondominium) {
      throw new UnauthorizedError('User is not a member of this condominium')
    }

    const hasPermission = userCondominium.role.permissions.some(
      (p) => p.name === this.permission
    )

    if (!hasPermission) {
      throw new UnauthorizedError(`User doesn't have permission: ${this.permission}`)
    }

    return { data: { userCondominium } }
  }
}