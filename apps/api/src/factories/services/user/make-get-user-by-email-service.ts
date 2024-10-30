import { GetUserByEmailService } from '@/application/services/user/get-user-by-email-service'

export function makeGetUserByEmailService() {
  return new GetUserByEmailService()
}
