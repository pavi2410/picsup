import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import compression from 'compression'
import jsonwebtoken from 'jsonwebtoken'

import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import userRouter from './routers/users/userRouter.js'
import imageRouter from './routers/images/imageRouter.js'

// ------- Setup -------

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())

app.use((req, res, next) => {
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('JWT')) {
    const token = req.headers.authorization.split(' ')[1]
    jsonwebtoken.verify(token, 'RESTFULAPIs', (err, payload) => {
      req.user = err ? null : payload;
      next();
    });
  } else {
    req.user = null;
    next();
  }
});

// ------- Request handlers -------

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/api/users', userRouter)
app.use('/api/images', imageRouter)

app.use(express.static(path.resolve(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`⚡ picsup server listening at http://localhost:${port}`)
})

export default app