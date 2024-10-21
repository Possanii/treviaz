import { CreateServiceOwnerController } from '@/application/controllers/serviceowner/create-serviceowner-controller'
import { makeCreateServiceOwnerService } from '@/factories/services/serviceowner/make-create-serviceowner-service'

export function makeCreateServiceOwnerController() {
  const createServiceOwnerService = makeCreateServiceOwnerService()

  return new CreateServiceOwnerController(createServiceOwnerService)
}
