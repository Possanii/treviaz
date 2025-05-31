import { makeAcceptInviteController } from '@/factories/controllers/invite/make-accept-invite-controller'
import { makeCreateInviteController } from '@/factories/controllers/invite/make-create-invite-controller'
import { makeDeleteInviteController } from '@/factories/controllers/invite/make-delete-invite-controller'
import { makeDenyInviteController } from '@/factories/controllers/invite/make-deny-invite-controller'
import { makeEditInviteController } from '@/factories/controllers/invite/make-edit-invite-controller'
import { makeGetAllInviteController } from '@/factories/controllers/invite/make-get-all-invite-controller'
import { makeGetInviteByTokenController } from '@/factories/controllers/invite/make-get-invite-by-token-controller'
import { makeRevokeInviteController } from '@/factories/controllers/invite/make-revoke-invite-controller'
import { makeAddCurrentUserToMetadataMiddleware } from '@/factories/middleware/make-add-current-user-to-metadata-middleware'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.post(
  '/invite',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAddCurrentUserToMetadataMiddleware()),
  routeAdapter(makeCreateInviteController())
)
app.delete('/invite/:id', routeAdapter(makeDeleteInviteController()))
app.put('/invite/:id', routeAdapter(makeEditInviteController()))
app.get(
  '/condominium/slug/:slug/invites',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAddCurrentUserToMetadataMiddleware()),
  routeAdapter(makeGetAllInviteController())
)
app.get('/invite/:token', routeAdapter(makeGetInviteByTokenController()))
app.post(
  '/invite/:token',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAddCurrentUserToMetadataMiddleware()),
  routeAdapter(makeAcceptInviteController())
)
app.put('/invite/:id/deny', routeAdapter(makeDenyInviteController()))
app.put('/invite/:id/revoke', routeAdapter(makeRevokeInviteController()))
