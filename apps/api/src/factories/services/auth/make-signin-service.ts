import { KeycloakService } from '@/application/services/auth/keycloak-service'
import { SignInService } from '@/application/services/auth/signin-service'

export function makeSignInService(): SignInService {
  const keycloakService = new KeycloakService()
  return new SignInService(keycloakService)
}
