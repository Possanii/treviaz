import { IData, IMiddleware } from '@/application/interfaces/IMiddleware'
import { IResponse } from '@/application/interfaces/IResponse'
import { prisma } from '@/application/libs/prisma'

import { IRequest } from '../interfaces/IRequest'
import { IKeycloakJwtPayload } from '../schemas/IKeycloakJwtPayload'

export class AddCurrentUserToMetadataMiddleware implements IMiddleware {
  async handle(request: IRequest): Promise<IResponse | IData> {
    const keycloakUser = request.metadata as IKeycloakJwtPayload

    try {
      const user = await prisma.user.findUnique({
        where: { keycloak_id: keycloakUser.sub },
        // include: {
        //   condominiums: {
        //     include: {
        //       condominium: true,
        //       role: { include: { permissions: true } },
        //     },
        //   },
        // },
      })

      if (!user) {
        throw new Error('User not found in database')
      }

      return {
        data: {
          user,
        },
      }
    } catch (error) {
      console.error('Error in CurrentUser decorator:', error)
      throw new Error('Failed to retrieve user data')
    }
  }
}
