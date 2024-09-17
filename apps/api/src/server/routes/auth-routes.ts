import { makeCreateUserController } from '@/factories/controllers/auth/make-create-user-controller'

import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.post('/auth/sign-up', routeAdapter(makeCreateUserController()))
