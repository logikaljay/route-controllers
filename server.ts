import * as express from 'express'
import GenerateRoutes from './src'

import withMiddleware from "./src/__tests__/controllers/MiddlewareController"

const MiddlewareController = withMiddleware([
  (res, req, next) => {
    console.log("request received")
    next()
  }
])

var router = GenerateRoutes([MiddlewareController])

var app = express()
app.use(router)

app.listen(3000, () => {
  console.log("server ready on http://localhost:3000")
})