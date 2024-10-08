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
import { makeCreateUserCondominiumController } from '@/factories/controllers/auth/usercondominium/make-create-usercondominium-controller'
import { makeDeleteUserCondominiumController } from '@/factories/controllers/auth/usercondominium/make-delete-usercondominium-controller'
import { makeEditUserCondominiumController } from '@/factories/controllers/auth/usercondominium/make-edit-usercondominium-controller'
import { makeCreateForumCategoryController } from '@/factories/controllers/auth/forumcategory/make-create-forumcategory-controller'
import { makeEditForumCategoryController } from '@/factories/controllers/auth/forumcategory/make-edit-forumcategory-controller'
import { makeDeleteForumCategoryController } from '@/factories/controllers/auth/forumcategory/make-delete-forumcategory-controller'

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

// UserCondominium routes
app.post('/usercondominium', routeAdapter(makeCreateUserCondominiumController()))
app.put('/usercondominium/:id', routeAdapter(makeEditUserCondominiumController()))
app.delete('/usercondominium/:id', routeAdapter(makeDeleteUserCondominiumController()))

// ForumCategory routes
app.post('/forumcategory', routeAdapter(makeCreateForumCategoryController()))
app.put('/forumcategory/:id', routeAdapter(makeEditForumCategoryController()))
app.delete('/forumcategory/:id', routeAdapter(makeDeleteForumCategoryController()))

