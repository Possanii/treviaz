import { makeCreateUserController } from '@/factories/controllers/auth/user/make-create-user-controller'
import { makeCreateCondominiumController } from '@/factories/controllers/auth/condominium/make-create-condominium-controller'

import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

import { makeCreateServiceOwnerController } from '@/factories/controllers/auth/serviceowner/make-create-serviceowner-controller'
import { makeEditServiceOwnerController } from '@/factories/controllers/auth/serviceowner/make-edit-serviceowner-controller'
import { makeDeleteServiceOwnerController } from '@/factories/controllers/auth/serviceowner/make-delete-serviceowner-controller'
import { makeEditUserController } from '@/factories/controllers/auth/user/make-edit-user-controller'
import { makeDeleteUserController } from '@/factories/controllers/auth/user/make-delete-user-controller'
import { makeEditCondominiumController } from '@/factories/controllers/auth/condominium/make-edit-condominium-controller'
import { makeDeleteCondominiumController } from '@/factories/controllers/auth/condominium/make-delete-condominium-controller'

// Condominium routes
app.post('/condominium', routeAdapter(makeCreateCondominiumController()))
app.put('/condominium/:id', routeAdapter(makeEditCondominiumController()))
app.delete('/condominium/:id', routeAdapter(makeDeleteCondominiumController()))

// ServiceOwner routes
app.post('/serviceowner', routeAdapter(makeCreateServiceOwnerController()))
app.put('/serviceowner/:id', routeAdapter(makeEditServiceOwnerController()))
app.delete('/serviceowner/:id', routeAdapter(makeDeleteServiceOwnerController()))

// User routes
app.post('/user', routeAdapter(makeCreateUserController()))
app.put('/user/:id', routeAdapter(makeEditUserController()))
app.delete('/user/:id', routeAdapter(makeDeleteUserController()))

