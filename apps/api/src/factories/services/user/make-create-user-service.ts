import { CreateUserService } from '@/application/services/create-user-service'

export function makeCreateUserService() {
  return new CreateUserService()
}
