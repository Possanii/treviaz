import { makeCreateUserController } from '@/factories/controllers/user/make-create-user-controller'

import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.post('/users', routeAdapter(makeCreateUserController()))
