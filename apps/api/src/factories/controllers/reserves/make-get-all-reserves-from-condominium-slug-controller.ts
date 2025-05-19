import { GetAllReservesFromCondominiumSlugController } from '@/application/controllers/reserve/get-all-reserves-from-condominium-slug-controller'
import { makeGetAllReservesFromCondominiumSlugService } from '@/factories/services/reserves/make-get-all-reserves-from-condominium-slug-service'

export function makeGetAllReservesFromCondominiumSlugController() {
  return new GetAllReservesFromCondominiumSlugController(
    makeGetAllReservesFromCondominiumSlugService()
  )
}
