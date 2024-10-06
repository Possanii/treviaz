import { CreateUserCondominiumService } from '@/application/services/auth/usercondominium/create-usercondominium-service'

export function makeCreateUserCondominiumService() {
  return new CreateUserCondominiumService()
}
