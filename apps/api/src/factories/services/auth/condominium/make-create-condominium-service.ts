import { CreateCondominiumService } from '@/application/services/auth/condominium/create-condominium-service'

export function makeCreateCondominiumService() {
  return new CreateCondominiumService()
}
