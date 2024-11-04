import { makeCreateCondominiumController } from '@/factories/controllers/condominium/make-create-condominium-controller'
import { makeDeleteCondominiumController } from '@/factories/controllers/condominium/make-delete-condominium-controller'
import { makeEditCondominiumController } from '@/factories/controllers/condominium/make-edit-condominium-controller'
import { makeGetCondominiumBySlugController } from '@/factories/controllers/condominium/make-get-condominium-by-slug-controller'
import { makeGetLiversFromCondominiumBySlugController } from '@/factories/controllers/condominium/make-get-livers-from-condominium-by-slug-controller'
import { makeGetUserRelationshipCondominiumsController } from '@/factories/controllers/condominium/make-get-user-relationship-condominium-controller'
import { makeCreateForumCategoryController } from '@/factories/controllers/forumcategory/make-create-forumcategory-controller'
import { makeDeleteForumCategoryController } from '@/factories/controllers/forumcategory/make-delete-forumcategory-controller'
import { makeEditForumCategoryController } from '@/factories/controllers/forumcategory/make-edit-forumcategory-controller'
import { makeGetForumCategoriesFromCondominiumController } from '@/factories/controllers/forumcategory/make-get-forum-categories-from-condominium-controller'
import { makeCreateForumPostController } from '@/factories/controllers/forumpost/make-create-forumpost-controller'
import { makeDeleteForumPostController } from '@/factories/controllers/forumpost/make-delete-forumpost-controller'
import { makeEditForumPostController } from '@/factories/controllers/forumpost/make-edit-forumpost-controller'
import { makeApproveForumThreadController } from '@/factories/controllers/forumthread/make-approve-forumthread-controller'
import { makeCreateForumThreadController } from '@/factories/controllers/forumthread/make-create-forumthread-controller'
import { makeDeleteForumThreadController } from '@/factories/controllers/forumthread/make-delete-forumthread-controller'
import { makeDenyForumThreadController } from '@/factories/controllers/forumthread/make-deny-forumthread-controller'
import { makeEditForumThreadController } from '@/factories/controllers/forumthread/make-edit-forumthread-controller'
import { makeAcceptInviteController } from '@/factories/controllers/invite/make-accept-invite-controller'
import { makeCreateInviteController } from '@/factories/controllers/invite/make-create-invite-controller'
import { makeDeleteInviteController } from '@/factories/controllers/invite/make-delete-invite-controller'
import { makeDenyInviteController } from '@/factories/controllers/invite/make-deny-invite-controller'
import { makeEditInviteController } from '@/factories/controllers/invite/make-edit-invite-controller'
import { makeGetAllInviteController } from '@/factories/controllers/invite/make-get-all-invite-controller'
import { makeGetInviteByTokenController } from '@/factories/controllers/invite/make-get-invite-by-token-controller'
import { makeRevokeInviteController } from '@/factories/controllers/invite/make-revoke-invite-controller'
import { makeCreateServiceOwnerController } from '@/factories/controllers/serviceowner/make-create-serviceowner-controller'
import { makeDeleteServiceOwnerController } from '@/factories/controllers/serviceowner/make-delete-serviceowner-controller'
import { makeEditServiceOwnerController } from '@/factories/controllers/serviceowner/make-edit-serviceowner-controller'
import { makeCreateUserController } from '@/factories/controllers/user/make-create-user-controller'
import { makeDeleteUserController } from '@/factories/controllers/user/make-delete-user-controller'
import { makeEditUserController } from '@/factories/controllers/user/make-edit-user-controller'
import { makeCreateUserCondominiumController } from '@/factories/controllers/usercondominium/make-create-usercondominium-controller'
import { makeDeleteUserCondominiumController } from '@/factories/controllers/usercondominium/make-delete-usercondominium-controller'
import { makeEditUserCondominiumController } from '@/factories/controllers/usercondominium/make-edit-usercondominium-controller'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

// Condominium routes
app.post(
  '/condominium',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateCondominiumController())
)
app.put('/condominium/:id', routeAdapter(makeEditCondominiumController()))
app.delete('/condominium/:id', routeAdapter(makeDeleteCondominiumController()))
app.get(
  '/user/condominiums/relationship',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetUserRelationshipCondominiumsController())
)
app.get(
  '/condominium/slug/:slug',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetCondominiumBySlugController())
)
app.get(
  '/condominium/slug/:slug/livers',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetLiversFromCondominiumBySlugController())
)

// ServiceOwner routes
app.post('/serviceowner', routeAdapter(makeCreateServiceOwnerController()))
app.put('/serviceowner/:id', routeAdapter(makeEditServiceOwnerController()))
app.delete(
  '/serviceowner/:id',
  routeAdapter(makeDeleteServiceOwnerController())
)

// User routes
app.post('/user', routeAdapter(makeCreateUserController()))
app.put('/user/:id', routeAdapter(makeEditUserController()))
app.delete('/user/:id', routeAdapter(makeDeleteUserController()))

// UserCondominium routes
app.post(
  '/usercondominium',
  routeAdapter(makeCreateUserCondominiumController())
)
app.put(
  '/usercondominium/:id',
  routeAdapter(makeEditUserCondominiumController())
)
app.delete(
  '/usercondominium/:id',
  routeAdapter(makeDeleteUserCondominiumController())
)

// ForumCategory routes
app.post(
  '/forumcategory',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateForumCategoryController())
)
app.put(
  '/forumcategory/:slug',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeEditForumCategoryController())
)
app.delete(
  '/forumcategory/:slug',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteForumCategoryController())
)

app.get(
  '/forumcategory/:slug/categories',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetForumCategoriesFromCondominiumController())
)

// ForumThread routes
app.post(
  '/forumthread',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateForumThreadController())
)
app.put(
  '/forumthread/:slug',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeEditForumThreadController())
)
app.delete(
  '/forumthread/:slug',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteForumThreadController())
)
app.put(
  '/forumthread/:slug/approve',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeApproveForumThreadController())
)
app.put(
  '/forumthread/:slug/deny',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeDenyForumThreadController())
)

// ForumPost routes
app.post(
  '/forumpost',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateForumPostController())
)
app.put(
  '/forumpost/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeEditForumPostController())
)
app.delete(
  '/forumpost/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteForumPostController())
)

// Invite routes
app.post(
  '/invite',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateInviteController())
)
app.delete('/invite/:id', routeAdapter(makeDeleteInviteController()))
app.put('/invite/:id', routeAdapter(makeEditInviteController()))
app.get(
  '/condominium/slug/:slug/invites',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetAllInviteController())
)
app.get('/invite/:token', routeAdapter(makeGetInviteByTokenController()))
app.post(
  '/invite/:token',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeAcceptInviteController())
)
app.put('/invite/:id/deny', routeAdapter(makeDenyInviteController()))
app.put('/invite/:id/revoke', routeAdapter(makeRevokeInviteController()))
