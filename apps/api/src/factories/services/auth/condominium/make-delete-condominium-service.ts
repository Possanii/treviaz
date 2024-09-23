import { DeleteCondominiumService } from '@/application/services/auth/condominium/delete-condominium-service'

export function makeDeleteCondominiumService() {
  return new DeleteCondominiumService()
}
