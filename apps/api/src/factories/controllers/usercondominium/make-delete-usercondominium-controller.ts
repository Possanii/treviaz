import { DeleteUserCondominiumController } from '@/application/controllers/usercondominium/delete-usercondominium-controller'
import { makeDeleteUserCondominiumService } from '@/factories/services/usercondominium/make-delete-usercondominium-service'

export function makeDeleteUserCondominiumController() {
  const deleteUserCondominiumService = makeDeleteUserCondominiumService()

  return new DeleteUserCondominiumController(deleteUserCondominiumService)
}

