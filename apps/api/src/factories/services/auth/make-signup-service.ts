import { KeycloakService } from '@/application/services/auth/keycloak-service'
import { SignUpService } from '@/application/services/auth/signup-service'

export function makeSignUpService(): SignUpService {
  const keycloakService = new KeycloakService()
  return new SignUpService(keycloakService)
}
