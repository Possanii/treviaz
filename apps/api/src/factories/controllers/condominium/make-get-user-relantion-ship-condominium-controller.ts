import { GetUserRelantionShipCondominiumsController } from '@/application/controllers/condominium/get-user-relantion-ship-condominiums-controller'
import { makeGetUserRelantionShipCondominiumsService } from '@/factories/services/condominium/make-get-user-relantion-ship-condominium-service'

export function makeGetUserRelantionShipCondominiumsController() {
  const getUserRelantionShipCondominiumsService =
    makeGetUserRelantionShipCondominiumsService()

  return new GetUserRelantionShipCondominiumsController(
    getUserRelantionShipCondominiumsService
  )
}
