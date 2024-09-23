import { DeleteServiceOwnerService } from '@/application/services/auth/serviceowner/delete-serviceowner-service'

export function makeDeleteServiceOwnerService() {
  return new DeleteServiceOwnerService()
}
