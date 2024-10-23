import { DeleteServiceOwnerController } from '@/application/controllers/serviceowner/delete-serviceowner-controller'
import { makeDeleteServiceOwnerService } from '@/factories/services/serviceowner/make-delete-serviceowner-service'

export function makeDeleteServiceOwnerController() {
  const deleteServiceOwnerService = makeDeleteServiceOwnerService()

  return new DeleteServiceOwnerController(deleteServiceOwnerService)
}
