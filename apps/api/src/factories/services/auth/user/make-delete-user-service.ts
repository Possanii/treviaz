import { DeleteUserService } from '@/application/services/auth/user/delete-user-service'

export function makeDeleteUserService() {
  return new DeleteUserService()
}
