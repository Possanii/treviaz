import { DeleteServiceOwnerService } from '@/application/services/serviceowner/delete-serviceowner-service'

export function makeDeleteServiceOwnerService() {
  return new DeleteServiceOwnerService()
}
