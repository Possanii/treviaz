import { CreateUserController } from '@/application/controllers/user/create-user-controller'
import { makeCreateUserService } from '@/factories/services/user/make-create-user-service'

export function makeCreateUserController() {
  const createUserService = makeCreateUserService()

  return new CreateUserController(createUserService)
}
