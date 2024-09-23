import { CreateServiceOwnerService } from '@/application/services/auth/serviceowner/create-serviceowner-service'

export function makeCreateServiceOwnerService() {
  return new CreateServiceOwnerService()
}
