import { IKeycloakJwtPayload } from '../schemas/IKeycloakJwtPayload'
import { IRequest } from '../interfaces/IRequest'
import { GetUserByKeycloakIdService } from '../services/user/get-user-by-keycloak-id-service'

export function CurrentUser() {
  const getUserService = new GetUserByKeycloakIdService()

  return function (
    target: any,
    propertyKey: string,
    parameterIndex: number
  ) {
    const originalMethod = target[propertyKey]

    target[propertyKey] = async function (...args: any[]) {
      const request: IRequest = args[0]
      const keycloakUser = request.user as IKeycloakJwtPayload
      
      const user = await getUserService.execute(keycloakUser.sub)

      args[parameterIndex] = user
      return originalMethod.apply(this, args)
    }
  }
} 