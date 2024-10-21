import { DeleteUserService } from '@/application/services/user/delete-user-service'

export function makeDeleteUserService() {
  return new DeleteUserService()
}
