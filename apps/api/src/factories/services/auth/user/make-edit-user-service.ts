import { EditUserService } from '@/application/services/auth/user/edit-user-service'

export function makeEditUserService() {
  return new EditUserService()
}
