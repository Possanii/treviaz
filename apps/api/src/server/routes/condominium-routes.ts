import { makeCreateCondominiumController } from '@/factories/controllers/condominium/make-create-condominium-controller'
import { makeDeleteCondominiumController } from '@/factories/controllers/condominium/make-delete-condominium-controller'
import { makeEditCondominiumController } from '@/factories/controllers/condominium/make-edit-condominium-controller'
import { makeGetCondominiumBySlugController } from '@/factories/controllers/condominium/make-get-condominium-by-slug-controller'
import { makeGetResidentsFromCondominiumBySlugController } from '@/factories/controllers/condominium/make-get-residents-from-condominium-by-slug-controller'
import { makeGetUserRelationshipCondominiumsController } from '@/factories/controllers/condominium/make-get-user-relationship-condominium-controller'
import { makeGetUnitsFromCondominiumController } from '@/factories/controllers/unit/make-get-units-from-condominium-controller'
import { makeAddCurrentUserToMetadataMiddleware } from '@/factories/middleware/make-add-current-user-to-metadata-middleware'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.post(
  '/condominium',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAddCurrentUserToMetadataMiddleware()),
  routeAdapter(makeCreateCondominiumController())
)
app.put('/condominium/:id', routeAdapter(makeEditCondominiumController()))
app.delete('/condominium/:id', routeAdapter(makeDeleteCondominiumController()))
app.get(
  '/user/condominiums/relationship',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAddCurrentUserToMetadataMiddleware()),
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

app.get(
  '/condominium/slug/:slug/units',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetUnitsFromCondominiumController())
)
