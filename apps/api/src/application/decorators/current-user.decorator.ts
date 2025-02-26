import { IKeycloakJwtPayload } from '../schemas/IKeycloakJwtPayload'
import { IRequest } from '../interfaces/IRequest'
import { PrismaClient } from '@prisma/client'

// Create a singleton Prisma client
const prisma = new PrismaClient()

export function CurrentUser() {
  return function (
    target: any,
    propertyKey: string,
    parameterIndex: number
  ) {
    const originalMethod = target[propertyKey]

    target[propertyKey] = async function (...args: any[]) {
      const request: IRequest = args[0]
      const keycloakUser = request.user as IKeycloakJwtPayload
      
      try {
        // Get the user with condominium relations and permissions
        const user = await prisma.user.findUnique({
          where: {
            keycloak_id: keycloakUser.sub
          },
          include: {
            condominiums: {
              include: {
                condominium: true,
                role: {
                  include: {
                    permissions: true
                  }
                }
              }
            }
          }
        })

        if (!user) {
          throw new Error('User not found in database')
        }

        args[parameterIndex] = user
        return originalMethod.apply(this, args)
      } catch (error) {
        console.error('Error in CurrentUser decorator:', error)
        throw new Error('Failed to retrieve user data')
      }
    }
  }
} 