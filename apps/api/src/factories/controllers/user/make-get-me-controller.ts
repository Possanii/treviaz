import { GetMeController } from '@/application/controllers/user/get-me-controller'
import { makeGetMeService } from '@/factories/services/user/make-get-me-service'

export function makeGetMeController() {
  return new GetMeController(makeGetMeService())
}
