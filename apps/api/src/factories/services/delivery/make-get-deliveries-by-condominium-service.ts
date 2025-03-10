import { GetDeliveriesByCondominiumService } from '@/application/services/delivery/get-deliveries-by-condominium-service'

export function makeGetDeliveriesByCondominiumService() {
  return new GetDeliveriesByCondominiumService()
} 