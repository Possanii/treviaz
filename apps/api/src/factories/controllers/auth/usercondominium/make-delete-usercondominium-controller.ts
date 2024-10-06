import { DeleteUserCondominiumController } from '@/application/controllers/auth/usercondominium/delete-usercondominium-controller'
import { makeDeleteUserCondominiumService } from '@/factories/services/auth/usercondominium/make-delete-usercondominium-service'

export function makeDeleteUserCondominiumController() {
  const deleteUserCondominiumService = makeDeleteUserCondominiumService()

  return new DeleteUserCondominiumController(deleteUserCondominiumService)
}

