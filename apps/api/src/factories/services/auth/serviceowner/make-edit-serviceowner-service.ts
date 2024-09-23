import { EditServiceOwnerService } from '@/application/services/auth/serviceowner/edit-serviceowner-service'

export function makeEditServiceOwnerService() {
  return new EditServiceOwnerService()
}
