import { DeleteUserCondominiumService } from '@/application/services/usercondominium/delete-usercondominium-service'

export function makeDeleteUserCondominiumService() {
  return new DeleteUserCondominiumService()
}