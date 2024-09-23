import { CreateServiceOwnerController } from '@/application/controllers/auth/serviceowner/create-serviceowner-controller'
import { makeCreateServiceOwnerService } from '@/factories/services/auth/serviceowner/make-create-serviceowner-service'

export function makeCreateServiceOwnerController() {
  const createServiceOwnerService = makeCreateServiceOwnerService()

  return new CreateServiceOwnerController(createServiceOwnerService)
}
