import { CreateUserCondominiumController } from '@/application/controllers/usercondominium/create-usercondominium-controller'
import { makeCreateUserCondominiumService } from '@/factories/services/usercondominium/make-create-usercondominium-service'

export function makeCreateUserCondominiumController() {
  const createUserCondominiumService = makeCreateUserCondominiumService()

  return new CreateUserCondominiumController(createUserCondominiumService)
}

