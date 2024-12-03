import { makeCreateUserController } from '@/factories/controllers/user/make-create-user-controller'
import { makeDeleteUserController } from '@/factories/controllers/user/make-delete-user-controller'
import { makeEditUserController } from '@/factories/controllers/user/make-edit-user-controller'
import { makeGetUserByIdController } from '@/factories/controllers/user/make-get-user-by-id-controller'

import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.get(
  '/user/:slug/:id',
  // middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetUserByIdController())
)
app.post('/user', routeAdapter(makeCreateUserController()))
app.put('/user/:id', routeAdapter(makeEditUserController()))
app.delete('/user/:id', routeAdapter(makeDeleteUserController()))
