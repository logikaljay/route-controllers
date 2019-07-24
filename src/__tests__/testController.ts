import GenerateRouter from "../"
import TestController from "./controllers/TestController"

describe("RouteControllers", () => {
  it("should return a router", () => {
    const router = GenerateRouter([TestController])
    expect(router).toBeDefined()
  })
})