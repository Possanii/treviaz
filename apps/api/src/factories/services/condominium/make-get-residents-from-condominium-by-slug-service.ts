import { GetResidentsFromCondominiumBySlugService } from '@/application/services/condominium/get-residents-from-condominium-by-slug-service'

export function makeGetResidentsFromCondominiumBySlugService() {
  return new GetResidentsFromCondominiumBySlugService()
}
