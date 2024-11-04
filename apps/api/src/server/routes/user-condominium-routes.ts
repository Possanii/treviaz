import { makeCreateUserCondominiumController } from '@/factories/controllers/usercondominium/make-create-usercondominium-controller'
import { makeDeleteUserCondominiumController } from '@/factories/controllers/usercondominium/make-delete-usercondominium-controller'
import { makeEditUserCondominiumController } from '@/factories/controllers/usercondominium/make-edit-usercondominium-controller'

import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

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
