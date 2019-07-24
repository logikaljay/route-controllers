import { Controller, Middleware } from "../../"

export default (middleware) => {
  @Controller("/middleware") 
  class MiddlewareController {
    @Middleware(middleware)
    public async GetTest(): Promise<string> {
      return ""
    }
  }

  return MiddlewareController
}
