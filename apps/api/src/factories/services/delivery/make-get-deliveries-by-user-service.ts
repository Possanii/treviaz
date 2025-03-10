import { GetDeliveriesByUserService } from '@/application/services/delivery/get-deliveries-by-user-service'

export function makeGetDeliveriesByUserService() {
  return new GetDeliveriesByUserService()
} 