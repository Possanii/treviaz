import { GetResidentsFromCondominiumBySlugController } from '@/application/controllers/condominium/get-residents-from-condominium-by-slug-controller'
import { makeGetResidentsFromCondominiumBySlugService } from '@/factories/services/condominium/make-get-residents-from-condominium-by-slug-service'

export function makeGetResidentsFromCondominiumBySlugController() {
  const getResidentsFromCondominiumBySlugService =
    makeGetResidentsFromCondominiumBySlugService()

  return new GetResidentsFromCondominiumBySlugController(
    getResidentsFromCondominiumBySlugService
  )
}
