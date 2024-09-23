import { EditUserController } from '@/application/controllers/auth/user/edit-user-controller'
import { makeEditUserService } from '@/factories/services/auth/user/make-edit-user-service'

export function makeEditUserController() {
  const editUserService = makeEditUserService()

  return new EditUserController(editUserService)
}
