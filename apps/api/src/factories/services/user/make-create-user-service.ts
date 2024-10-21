import { CreateUserService } from '@/application/services/user/create-user-service'

export function makeCreateUserService() {
  return new CreateUserService()
}
