import { SignInController } from '@/application/controllers/auth/signin-controller'
import { SignUpController } from '@/application/controllers/auth/signup-controller'
import { KeycloakService } from '@/application/services/auth/keycloak-service'
import { SignInService } from '@/application/services/auth/signin-service'
import { SignUpService } from '@/application/services/auth/signup-service'

import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.post(
  '/auth/signup',
  routeAdapter(new SignUpController(new SignUpService(new KeycloakService())))
)
app.post(
  '/auth/signin',
  routeAdapter(new SignInController(new SignInService(new KeycloakService())))
)
