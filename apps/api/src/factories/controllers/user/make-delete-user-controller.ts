import { DeleteUserController } from '@/application/controllers/user/delete-user-controller'
import { makeDeleteUserService } from '@/factories/services/user/make-delete-user-service'

export function makeDeleteUserController() {
  const deleteUserService = makeDeleteUserService()

  return new DeleteUserController(deleteUserService)
}
