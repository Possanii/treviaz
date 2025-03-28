import { CreateLeisureAreaService } from '@/application/services/leisure-areas/create-leisure-area-service'

export function makeCreateLeisureAreaService() {
  return new CreateLeisureAreaService()
} 