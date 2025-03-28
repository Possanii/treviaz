import { DeleteLeisureAreaService } from '@/application/services/leisure-areas/delete-leisure-area-service'

export function makeDeleteLeisureAreaService() {
  return new DeleteLeisureAreaService()
} 