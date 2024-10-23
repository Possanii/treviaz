import { EditUserController } from '@/application/controllers/user/edit-user-controller'
import { makeEditUserService } from '@/factories/services/user/make-edit-user-service'

export function makeEditUserController() {
  const editUserService = makeEditUserService()

  return new EditUserController(editUserService)
}
