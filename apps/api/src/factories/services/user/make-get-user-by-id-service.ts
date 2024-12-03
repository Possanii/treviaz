import { GetUserByIdService } from '@/application/services/user/get-user-by-id-servuce'

export function makeGetUserByIdService() {
  return new GetUserByIdService()
}
