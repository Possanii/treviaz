import { CreateUserService } from '@/application/services/auth/user/create-user-service'

export function makeCreateUserService() {
  return new CreateUserService()
}
