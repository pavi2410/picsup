import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { compress } from 'hono/compress'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'
import type { JwtVariables } from 'hono/jwt'
import { logger } from 'hono/logger'

import { JWT_SECRET, PORT } from './config.js'
import imageRouter from './routers/imageRouter.js'
import authRouter from './routers/authRouter.js'
import userRouter from './routers/userRouter.js'

if (!JWT_SECRET) {
  console.error('Missing JWT_SECRET')
  process.exit(1)
}

type Variables = JwtVariables

export const app = new Hono<{ Variables: Variables }>()

app.use(logger())
app.use(cors())
app.use(compress())
app.use("/api/*", jwt({
  secret: JWT_SECRET,
  cookie: 'jwt',
}));

app.route('/auth', authRouter)
app.route('/api/user', userRouter)
app.route('/api/images', imageRouter)

app.get('/health', (c) => c.text('OK'))

if (process.env.NODE_ENV === 'production') {
  app.use("*", serveStatic({ root: "../frontend/dist" }));
} else {
  app.get('/', (c) => c.text('Hello World from picsup!'));
}

console.log(`picsup server running on port ${PORT}`)
export type App = typeof app;
export default {
  port: PORT,
  fetch: app.fetch,
}