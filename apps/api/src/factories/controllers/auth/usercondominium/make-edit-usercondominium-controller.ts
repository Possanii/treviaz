import { EditUserCondominiumController } from '@/application/controllers/auth/usercondominium/edit-usercondominium-controller'
import { makeEditUserCondominiumService } from '@/factories/services/auth/usercondominium/make-edit-usercondominium-service'

export function makeEditUserCondominiumController() {
  const EditUserCondominiumService = makeEditUserCondominiumService()

  return new EditUserCondominiumController(EditUserCondominiumService)
}

