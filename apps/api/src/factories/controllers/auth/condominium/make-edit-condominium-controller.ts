import { EditCondominiumController } from '@/application/controllers/auth/condominium/edit-condominium-controller'
import { makeEditCondominiumService } from '@/factories/services/auth/condominium/make-edit-condominium-service'

export function makeEditCondominiumController() {
  const editCondominiumService = makeEditCondominiumService()

  return new EditCondominiumController(editCondominiumService)
}
