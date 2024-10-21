import { CreateUserCondominiumService } from '@/application/services/usercondominium/create-usercondominium-service'

export function makeCreateUserCondominiumService() {
  return new CreateUserCondominiumService()
}
