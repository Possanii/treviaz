import { CreateUserCondominiumController } from '@/application/controllers/auth/usercondominium/create-usercondominium-controller'
import { makeCreateUserCondominiumService } from '@/factories/services/auth/usercondominium/make-create-usercondominium-service'

export function makeCreateUserCondominiumController() {
  const createUserCondominiumService = makeCreateUserCondominiumService()

  return new CreateUserCondominiumController(createUserCondominiumService)
}

