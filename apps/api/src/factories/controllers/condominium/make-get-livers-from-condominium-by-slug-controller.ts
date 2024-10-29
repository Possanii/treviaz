import { GetLiversFromCondominiumBySlugController } from '@/application/controllers/condominium/get-livers-from-condominium-by-slug-controller'
import { makeGetLiversFromCondominiumBySlugService } from '@/factories/services/condominium/make-get-livers-from-condominium-by-slug-service'

export function makeGetLiversFromCondominiumBySlugController() {
  const getLiversFromCondominiumBySlugService =
    makeGetLiversFromCondominiumBySlugService()

  return new GetLiversFromCondominiumBySlugController(
    getLiversFromCondominiumBySlugService
  )
}
