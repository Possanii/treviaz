import { EditCondominiumController } from '@/application/controllers/condominium/edit-condominium-controller'
import { makeEditCondominiumService } from '@/factories/services/condominium/make-edit-condominium-service'

export function makeEditCondominiumController() {
  const editCondominiumService = makeEditCondominiumService()

  return new EditCondominiumController(editCondominiumService)
}
