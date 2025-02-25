import { GetMeService } from '@/application/services/user/get-me-service'

export function makeGetMeService() {
  return new GetMeService()
}
