import { makeCreateCondominiumController } from '@/factories/controllers/condominium/make-create-condominium-controller'
import { makeDeleteCondominiumController } from '@/factories/controllers/condominium/make-delete-condominium-controller'
import { makeEditCondominiumController } from '@/factories/controllers/condominium/make-edit-condominium-controller'
import { makeGetCondominiumBySlugController } from '@/factories/controllers/condominium/make-get-condominium-by-slug-controller'
import { makeGetUserRelationshipCondominiumsController } from '@/factories/controllers/condominium/make-get-user-relationship-condominium-controller'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'
import { makeGetResidentsFromCondominiumBySlugController } from '@/factories/controllers/condominium/make-get-residents-from-condominium-by-slug-controller'

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
  '/condominium/slug/:slug/residents',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetResidentsFromCondominiumBySlugController())
)
