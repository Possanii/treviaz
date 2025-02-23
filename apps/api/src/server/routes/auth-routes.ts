import { SignInController } from '@/application/controllers/auth/signin-controller'
import { SignUpController } from '@/application/controllers/auth/signup-controller'
import { KeycloakService } from '@/application/services/auth/keycloak-service'
import { SignInService } from '@/application/services/auth/signin-service'
import { SignUpService } from '@/application/services/auth/signup-service'

import app from '../lib/express'

app.post(
  '/auth/signup',
  new SignUpController(new SignUpService(new KeycloakService())).handle
)
app.post(
  '/auth/signin',
  new SignInController(new SignInService(new KeycloakService())).handle
)
