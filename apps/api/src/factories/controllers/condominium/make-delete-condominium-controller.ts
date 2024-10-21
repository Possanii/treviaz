import { DeleteCondominiumController } from '@/application/controllers/condominium/delete-condominium-controller'
import { makeDeleteCondominiumService } from '@/factories/services/condominium/make-delete-condominium-service'

export function makeDeleteCondominiumController() {
  const deleteCondominiumService = makeDeleteCondominiumService()

  return new DeleteCondominiumController(deleteCondominiumService)
}
