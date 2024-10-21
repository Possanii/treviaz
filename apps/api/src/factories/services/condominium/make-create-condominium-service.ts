import { CreateCondominiumService } from '@/application/services/condominium/create-condominium-service'

export function makeCreateCondominiumService() {
  return new CreateCondominiumService()
}
