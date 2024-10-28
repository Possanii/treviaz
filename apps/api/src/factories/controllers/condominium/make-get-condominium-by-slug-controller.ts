import { GetCondominiumBySlugController } from '@/application/controllers/condominium/get-condominium-by-slug-controller'
import { makeGetCondominiumBySlugService } from '@/factories/services/condominium/make-get-condominium-by-slug-service'

export function makeGetCondominiumBySlugController() {
  const getCondominiumBySlugService = makeGetCondominiumBySlugService()

  return new GetCondominiumBySlugController(getCondominiumBySlugService)
}
