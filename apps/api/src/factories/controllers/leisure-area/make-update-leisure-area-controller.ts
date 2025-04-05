import { UpdateLeisureAreaController } from '@/application/controllers/leisure-area/update-leisure-area-controller'
import { makeUpdateLeisureAreaService } from '@/factories/services/leisure-area/make-update-leisure-area-service'

export function makeUpdateLeisureAreaController() {
  return new UpdateLeisureAreaController(makeUpdateLeisureAreaService())
} 