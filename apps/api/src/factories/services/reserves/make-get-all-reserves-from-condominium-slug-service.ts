import { GetAllReservesFromCondominiumSlugService } from '@/application/services/reserve/get-all-reserves-from-condominium-slug-service'

export function makeGetAllReservesFromCondominiumSlugService() {
  return new GetAllReservesFromCondominiumSlugService()
}
