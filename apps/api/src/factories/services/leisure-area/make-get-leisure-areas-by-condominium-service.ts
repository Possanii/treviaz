import { GetLeisureAreasByCondominiumService } from '@/application/services/leisure-areas/get-leisure-areas-by-condominium-service'

export function makeGetLeisureAreasByCondominiumService() {
  return new GetLeisureAreasByCondominiumService()
} 