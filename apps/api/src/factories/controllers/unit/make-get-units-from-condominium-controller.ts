import { GetUnitsFromCondominiumController } from '@/application/controllers/unit/get-units-from-condominium-controller'
import { makeGetUnitsFromCondominiumService } from '@/factories/services/unit/make-get-units-from-condominium-service'

export function makeGetUnitsFromCondominiumController() {
  return new GetUnitsFromCondominiumController(
    makeGetUnitsFromCondominiumService()
  )
}
