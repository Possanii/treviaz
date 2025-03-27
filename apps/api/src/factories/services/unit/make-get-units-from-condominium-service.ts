import { GetUnitsFromCondominiumService } from '@/application/services/unit/get-units-from-condominium-service'

export function makeGetUnitsFromCondominiumService() {
  return new GetUnitsFromCondominiumService()
}
