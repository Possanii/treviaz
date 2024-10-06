import { DeleteUserCondominiumService } from '@/application/services/auth/usercondominium/delete-usercondominium-service'

export function makeDeleteUserCondominiumService() {
  return new DeleteUserCondominiumService()
}
