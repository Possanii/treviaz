import { AuthenticationMiddleware } from '@/application/middleware/authentication-middleware'

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware()
}
