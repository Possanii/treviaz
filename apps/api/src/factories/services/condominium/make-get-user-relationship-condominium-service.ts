import { GetUserRelationshipCondominiumsService } from '@/application/services/condominium/get-user-relationship-condominiums-service'

export function makeGetUserRelationshipCondominiumsService() {
  return new GetUserRelationshipCondominiumsService()
}
