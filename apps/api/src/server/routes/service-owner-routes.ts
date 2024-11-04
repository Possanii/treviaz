import { makeCreateServiceOwnerController } from '@/factories/controllers/serviceowner/make-create-serviceowner-controller'
import { makeDeleteServiceOwnerController } from '@/factories/controllers/serviceowner/make-delete-serviceowner-controller'
import { makeEditServiceOwnerController } from '@/factories/controllers/serviceowner/make-edit-serviceowner-controller'

import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.post('/serviceowner', routeAdapter(makeCreateServiceOwnerController()))
app.put('/serviceowner/:id', routeAdapter(makeEditServiceOwnerController()))
app.delete(
  '/serviceowner/:id',
  routeAdapter(makeDeleteServiceOwnerController())
)
