import { GetLeisureAreasByCondominiumController } from '@/application/controllers/leisure-area/get-leisure-areas-by-condominium-controller'
import { makeGetLeisureAreasByCondominiumService } from '@/factories/services/leisure-area/make-get-leisure-areas-by-condominium-service'

export function makeGetLeisureAreasByCondominiumController() {
  return new GetLeisureAreasByCondominiumController(
    makeGetLeisureAreasByCondominiumService()
  )
} 