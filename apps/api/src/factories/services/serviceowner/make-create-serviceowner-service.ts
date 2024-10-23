import { CreateServiceOwnerService } from '@/application/services/serviceowner/create-serviceowner-service'

export function makeCreateServiceOwnerService() {
  return new CreateServiceOwnerService()
}
