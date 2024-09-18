import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { compress } from 'hono/compress'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'
import { logger } from 'hono/logger'

import { JWT_SECRET, PORT } from './config.js'
import imageRouter from './routers/imageRouter.js'
import userRouter from './routers/userRouter.js'

if (!JWT_SECRET) {
  console.error('Missing JWT_SECRET')
  process.exit(1)
}

const app = new Hono()

app.use(logger())
app.use(cors())
app.use(compress())
app.use(jwt({
  secret: JWT_SECRET,
}));

app.route('/api/users', userRouter)
app.route('/api/images', imageRouter)

app.get('/health', (c) => c.text('OK'))

if (process.env.NODE_ENV === 'production') {
  app.use("*", serveStatic({ root: "../frontend/dist" }));
} else {
  app.get('/', (c) => c.text('Hello World from picsup!'));
}

export default {
  port: PORT,
  fetch: app.fetch,
}