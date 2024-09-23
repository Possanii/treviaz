import { CreateUserController } from '@/application/controllers/auth/user/create-user-controller'
import { makeCreateUserService } from '@/factories/services/auth/user/make-create-user-service'

export function makeCreateUserController() {
  const createUserService = makeCreateUserService()

  return new CreateUserController(createUserService)
}
