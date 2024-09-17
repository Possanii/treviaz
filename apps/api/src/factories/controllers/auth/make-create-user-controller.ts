import { CreateUserController } from '@/application/controllers/auth/create-user-controller'
import { makeCreateUserService } from '@/factories/services/auth/make-create-user-service'

export function makeCreateUserController() {
  const createUserService = makeCreateUserService()

  return new CreateUserController(createUserService)
}
