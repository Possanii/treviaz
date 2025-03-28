import { DeleteLeisureAreaController } from '@/application/controllers/leisure-area/delete-leisure-area-controller'
import { makeDeleteLeisureAreaService } from '@/factories/services/leisure-area/make-delete-leisure-area-service'

export function makeDeleteLeisureAreaController() {
  return new DeleteLeisureAreaController(makeDeleteLeisureAreaService())
} 