import { GetUserByIdController } from '@/application/controllers/user/get-user-by-id-controller'
import { makeGetUserByIdService } from '@/factories/services/user/make-get-user-by-id-service'

export function makeGetUserByIdController() {
  return new GetUserByIdController(makeGetUserByIdService())
}
