import { EditServiceOwnerController } from '@/application/controllers/auth/serviceowner/edit-serviceowner-controller'
import { makeEditServiceOwnerService } from '@/factories/services/auth/serviceowner/make-edit-serviceowner-service'

export function makeEditServiceOwnerController() {
  const editServiceOwnerService = makeEditServiceOwnerService()

  return new EditServiceOwnerController(editServiceOwnerService)
}