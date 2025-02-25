import { makeCreateUserController } from '@/factories/controllers/user/make-create-user-controller'
import { makeDeleteUserController } from '@/factories/controllers/user/make-delete-user-controller'
import { makeEditUserController } from '@/factories/controllers/user/make-edit-user-controller'
import { makeGetMeController } from '@/factories/controllers/user/make-get-me-controller'
import { makeGetUserByIdController } from '@/factories/controllers/user/make-get-user-by-id-controller'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.get('/user/:slug/:id', routeAdapter(makeGetUserByIdController()))
app.post('/user', routeAdapter(makeCreateUserController()))
app.get(
  '/user',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetMeController())
)
app.put(
  '/user/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeEditUserController())
)
app.delete(
  '/user/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteUserController())
)
