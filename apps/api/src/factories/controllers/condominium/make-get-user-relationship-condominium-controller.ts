import { GetUserRelationshipCondominiumsController } from '@/application/controllers/condominium/get-user-relationship-condominiums-controller'
import { makeGetUserRelationshipCondominiumsService } from '@/factories/services/condominium/make-get-user-relationship-condominium-service'

export function makeGetUserRelationshipCondominiumsController() {
  const getUserRelationshipCondominiumsService =
    makeGetUserRelationshipCondominiumsService()

  return new GetUserRelationshipCondominiumsController(
    getUserRelationshipCondominiumsService
  )
}
