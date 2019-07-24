import GenerateRouter, {
  setHttpMethodNameMapper,
  Middleware,
  HttpMethod
} from "../"

describe("Module Exports", () => {
  it("GenerateRouter should be exported as a function", () => {
    expect(GenerateRouter).toBeDefined()
    expect(GenerateRouter).toBeInstanceOf(Function)
  })
  it("Middleware should be exported as a function", () => {
    expect(Middleware).toBeDefined()
    expect(Middleware).toBeInstanceOf(Function)
  })

  it("HttpMethod should be exported as a function", () => {
    expect(HttpMethod).toBeDefined()
    expect(Middleware).toBeInstanceOf(Function)
  })

  it("setHttpMethodNameMapper should be exported as a function", () => {
    expect(setHttpMethodNameMapper).toBeDefined()
    expect(setHttpMethodNameMapper).toBeInstanceOf(Function)
  })
})