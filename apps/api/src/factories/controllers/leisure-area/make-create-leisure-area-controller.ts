import { CreateLeisureAreaController } from '@/application/controllers/leisure-area/create-leisure-area-controller'
import { makeCreateLeisureAreaService } from '@/factories/services/leisure-area/make-create-leisure-area-service'

export function makeCreateLeisureAreaController() {
  return new CreateLeisureAreaController(makeCreateLeisureAreaService())
} 