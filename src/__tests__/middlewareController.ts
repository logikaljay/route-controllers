import * as express from "express"
import * as request from 'supertest'
import GenerateRoutes from '../'
import withMiddleware from './controllers/MiddlewareController'

let app = null

describe("MiddlewareControllers", () => {
  beforeAll(() => {
    app = express()
    app.listen(3000)
  })

  it("should process middleware provided by a decorator", async () => {
    const mockMiddleware = jest.fn().mockImplementation((req, res, next) => {
      next()
    })

    const MiddlewareController = withMiddleware([
      mockMiddleware
    ])

    const router = GenerateRoutes([MiddlewareController])
    expect(router).toBeDefined()
    app.use(router);

    const res = await request(app).get('/middleware/GetTest')
    expect(res.statusCode).toBe(200)
    expect(mockMiddleware).toHaveBeenCalled()
  })
})