import { GetLiversFromCondominiumBySlugService } from '@/application/services/condominium/get-livers-from-condominium-by-slug-service'

export function makeGetLiversFromCondominiumBySlugService() {
  return new GetLiversFromCondominiumBySlugService()
}
