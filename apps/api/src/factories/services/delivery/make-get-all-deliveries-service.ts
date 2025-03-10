import { GetAllDeliveriesService } from '@/application/services/delivery/get-all-deliveries-service'

export function makeGetAllDeliveriesService() {
  return new GetAllDeliveriesService()
} 