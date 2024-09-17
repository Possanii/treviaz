import 'module-alias/register'
import './routes'

import { env } from '@treviaz/env'

import { errorHandler } from '@/application/middleware/error-handler'

import app from './lib/express'

app.use(errorHandler)

app.listen(env.SERVER_PORT, () => {
  console.log('🔥 Listening on port ' + env.SERVER_PORT)
})
