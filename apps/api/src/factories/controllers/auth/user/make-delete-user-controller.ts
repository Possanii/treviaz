import { DeleteUserController } from '@/application/controllers/auth/user/delete-user-controller'
import { makeDeleteUserService } from '@/factories/services/auth/user/make-delete-user-service'

export function makeDeleteUserController() {
  const deleteUserService = makeDeleteUserService()

  return new DeleteUserController(deleteUserService)
}
