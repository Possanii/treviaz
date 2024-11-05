import { makeApproveForumThreadController } from '@/factories/controllers/forumthread/make-approve-forumthread-controller'
import { makeCreateForumThreadController } from '@/factories/controllers/forumthread/make-create-forumthread-controller'
import { makeDeleteForumThreadController } from '@/factories/controllers/forumthread/make-delete-forumthread-controller'
import { makeDenyForumThreadController } from '@/factories/controllers/forumthread/make-deny-forumthread-controller'
import { makeEditForumThreadController } from '@/factories/controllers/forumthread/make-edit-forumthread-controller'
import { makeGetAllForumThreadsController } from '@/factories/controllers/forumthread/make-get-all-forum-threads-controller'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.post(
  '/forumthread',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateForumThreadController())
)

app.get(
  '/forumthread/:slug',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetAllForumThreadsController())
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
