import { CreateUserService } from '@/application/services/auth/create-user-service'

export function makeCreateUserService() {
  return new CreateUserService()
}
