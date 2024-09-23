import { CreateCondominiumController } from '@/application/controllers/auth/condominium/create-condominium-controller'
import { makeCreateCondominiumService } from '@/factories/services/auth/condominium/make-create-condominium-service'

export function makeCreateCondominiumController() {
  const createCondominiumService = makeCreateCondominiumService()

  return new CreateCondominiumController(createCondominiumService)
}
