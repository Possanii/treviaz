import { DeleteServiceOwnerController } from '@/application/controllers/auth/serviceowner/delete-serviceowner-controller'
import { makeDeleteServiceOwnerService } from '@/factories/services/auth/serviceowner/make-delete-serviceowner-service'

export function makeDeleteServiceOwnerController() {
  const deleteServiceOwnerService = makeDeleteServiceOwnerService()

  return new DeleteServiceOwnerController(deleteServiceOwnerService)
}
