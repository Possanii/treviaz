import { GetCondominiumBySlugService } from '@/application/services/condominium/get-condominium-by-slug'

export function makeGetCondominiumBySlugService() {
  return new GetCondominiumBySlugService()
}
