import { DeleteCondominiumService } from '@/application/services/condominium/delete-condominium-service'

export function makeDeleteCondominiumService() {
  return new DeleteCondominiumService()
}
