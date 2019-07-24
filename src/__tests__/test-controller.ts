import GenerateRoutes from "../"
import TestController from "./controllers/TestController"

describe("RouteControllers", () => {
  it("should export an object", () => {
    expect(GenerateRoutes).toBeDefined()
  })

  it("dummy", () => {

    const router = GenerateRoutes([TestController])
    expect(router).toBeDefined()
    console.log(router)

    expect(true).toBe(true);
  })
})