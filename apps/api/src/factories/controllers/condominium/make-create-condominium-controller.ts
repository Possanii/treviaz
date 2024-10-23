import { CreateCondominiumController } from '@/application/controllers/condominium/create-condominium-controller'
import { makeCreateCondominiumService } from '@/factories/services/condominium/make-create-condominium-service'

export function makeCreateCondominiumController() {
  const createCondominiumService = makeCreateCondominiumService()

  return new CreateCondominiumController(createCondominiumService)
}
