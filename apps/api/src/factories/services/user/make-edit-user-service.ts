import { EditUserService } from '@/application/services/user/edit-user-service'

export function makeEditUserService() {
  return new EditUserService()
}
