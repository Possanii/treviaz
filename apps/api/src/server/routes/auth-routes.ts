import app from '../lib/express'
import { routeAdapter } from '../adapters/route-adapter'

import { makeCreateCondominiumController } from '@/factories/controllers/condominium/make-create-condominium-controller'
import { makeDeleteCondominiumController } from '@/factories/controllers/condominium/make-delete-condominium-controller'
import { makeEditCondominiumController } from '@/factories/controllers/condominium/make-edit-condominium-controller'

import { makeCreateForumCategoryController } from '@/factories/controllers/forumcategory/make-create-forumcategory-controller'
import { makeDeleteForumCategoryController } from '@/factories/controllers/forumcategory/make-delete-forumcategory-controller'
import { makeEditForumCategoryController } from '@/factories/controllers/forumcategory/make-edit-forumcategory-controller'

import { makeCreateForumPostController } from '@/factories/controllers/forumpost/make-create-forumpost-controller'
import { makeDeleteForumPostController } from '@/factories/controllers/forumpost/make-delete-forumpost-controller'
import { makeEditForumPostController } from '@/factories/controllers/forumpost/make-edit-forumpost-controller'

import { makeCreateForumThreadController } from '@/factories/controllers/forumthread/make-create-forumthread-controller'
import { makeDeleteForumThreadController } from '@/factories/controllers/forumthread/make-delete-forumthread-controller'
import { makeEditForumThreadController } from '@/factories/controllers/forumthread/make-edit-forumthread-controller'

import { makeCreateServiceOwnerController } from '@/factories/controllers/serviceowner/make-create-serviceowner-controller'
import { makeDeleteServiceOwnerController } from '@/factories/controllers/serviceowner/make-delete-serviceowner-controller'
import { makeEditServiceOwnerController } from '@/factories/controllers/serviceowner/make-edit-serviceowner-controller'

import { makeCreateUserController } from '@/factories/controllers/user/make-create-user-controller'
import { makeDeleteUserController } from '@/factories/controllers/user/make-delete-user-controller'
import { makeEditUserController } from '@/factories/controllers/user/make-edit-user-controller'

import { makeCreateUserCondominiumController } from '@/factories/controllers/usercondominium/make-create-usercondominium-controller'
import { makeDeleteUserCondominiumController } from '@/factories/controllers/usercondominium/make-delete-usercondominium-controller'
import { makeEditUserCondominiumController } from '@/factories/controllers/usercondominium/make-edit-usercondominium-controller'

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

// ForumThread routes
app.post('/forumthread', routeAdapter(makeCreateForumThreadController()))
app.put('/forumthread/:id', routeAdapter(makeEditForumThreadController()))
app.delete('/forumthread/:id', routeAdapter(makeDeleteForumThreadController()))

// ForumPost routes
app.post('/forumpost', routeAdapter(makeCreateForumPostController()))
app.put('/forumpost/:id', routeAdapter(makeEditForumPostController()))  
app.delete('/forumpost/:id', routeAdapter(makeDeleteForumPostController()))


