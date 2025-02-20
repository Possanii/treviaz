import { SignInController } from '@/application/controllers/auth/signin-controller'
import { makeSignInService } from '@/application/factories/services/auth/make-signin-service'

export function makeSignInController(): SignInController {
  const signInService = makeSignInService()
  return new SignInController(signInService)
}