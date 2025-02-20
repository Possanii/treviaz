import { SignUpController } from '@/application/controllers/auth/signup-controller'
import { makeSignUpService } from '@/application/factories/services/auth/make-signup-service'

export function makeSignUpController(): SignUpController {
  const signUpService = makeSignUpService()
  return new SignUpController(signUpService)
}