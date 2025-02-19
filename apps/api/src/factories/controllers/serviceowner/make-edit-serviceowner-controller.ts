import { EditServiceOwnerController } from '@/application/controllers/serviceowner/edit-serviceowner-controller'
import { makeEditServiceOwnerService } from '@/factories/services/serviceowner/make-edit-serviceowner-service'

export function makeEditServiceOwnerController() {
  const editServiceOwnerService = makeEditServiceOwnerService()

  return new EditServiceOwnerController(editServiceOwnerService)
}
