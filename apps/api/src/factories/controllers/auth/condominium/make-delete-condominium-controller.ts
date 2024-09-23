import { DeleteCondominiumController } from '@/application/controllers/auth/condominium/delete-condominium-controller'
import { makeDeleteCondominiumService } from '@/factories/services/auth/condominium/make-delete-condominium-service'

export function makeDeleteCondominiumController() {
  const deleteCondominiumService = makeDeleteCondominiumService()

  return new DeleteCondominiumController(deleteCondominiumService)
}
