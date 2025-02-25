import { GetUserByIdService } from '@/application/services/user/get-user-by-id-service'

export function makeGetUserByIdService() {
  return new GetUserByIdService()
}
