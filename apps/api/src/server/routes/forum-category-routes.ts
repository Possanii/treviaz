import { makeCreateForumCategoryController } from '@/factories/controllers/forumcategory/make-create-forumcategory-controller'
import { makeDeleteForumCategoryController } from '@/factories/controllers/forumcategory/make-delete-forumcategory-controller'
import { makeEditForumCategoryController } from '@/factories/controllers/forumcategory/make-edit-forumcategory-controller'
import { makeGetForumCategoriesFromCondominiumController } from '@/factories/controllers/forumcategory/make-get-forum-categories-from-condominium-controller'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.post(
  '/forumcategory/:slug',
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
  '/forumcategory/:slug',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetForumCategoriesFromCondominiumController())
)
