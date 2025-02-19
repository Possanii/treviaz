import { EditUserCondominiumController } from '@/application/controllers/usercondominium/edit-usercondominium-controller'
import { makeEditUserCondominiumService } from '@/factories/services/usercondominium/make-edit-usercondominium-service'

export function makeEditUserCondominiumController() {
  const EditUserCondominiumService = makeEditUserCondominiumService()

  return new EditUserCondominiumController(EditUserCondominiumService)
}
