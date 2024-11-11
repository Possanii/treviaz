import { makeCreateForumPostController } from '@/factories/controllers/forumpost/make-create-forumpost-controller'
import { makeDeleteForumPostController } from '@/factories/controllers/forumpost/make-delete-forumpost-controller'
import { makeEditForumPostController } from '@/factories/controllers/forumpost/make-edit-forumpost-controller'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.post(
  '/forumpost/:condSlug/:threadSlug',
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
