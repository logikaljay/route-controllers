# route-controllers

Use opinionated typescript ES6 classes as express routes.

## How to use

```typescript
import * as express from "express"
import GenerateRouter, { Middleware } from "route-controllers"

class TestController {
  public async GetTest(name: string): Promise<string> => {
    return `Hi ${name}`
  }

  @HttpMethod("post")
  public async AnotherTest(name: string): Promis<string> => {
    return `Created ${name}`
  }

  public async GetJsonTest(name: string): Promise<object> => {
    return {
      "greeting": `Hi ${name}`
    }
  }

  public async GetAdvancedTest(name: string, req: express.Request, res: express.Response): void => {
    res.end(`Hi ${req.query.name}`)
  }

  @Middleware([
    (req, res, next) => {
      console.log("request received")
      next()
    }
  ])
  public async GetMiddlewareTest(name: string): string => {
    return `Hi ${name}`
  }
}

var router = GenerateRouter([TestController])
var app = express()
app.use(router)

app.listen(3000, () => {
  console.log(`express listening on ${3000}`)
})
```

## How do I map http methods?

By default we deduce the http method from the name of your method in the controllers

| method name | http method | route |
| ----------- | ----------- | ----- |
| GetSomething | GET | /GetSomething |
| CreateSomething | POST | /CreateSomething |
| UpdateSomething | PUT | /UpdateSomething |
| DeleteSomething | DELETE | /DeleteSomething |


However you can overwrite our basic method mapper by passing `setHttpMethodNameMapper` a function before you `GenerateRouter`

In the below example we will map all method names starting with `delete` to a delete http method, everything else will be a `get` http method.

```typescript
import GenerateRouter, { setHttpMethodNameMapper } from "route-controllers"

setHttpMethodNameMapper(
  (methodName) => {
    return methodName.toLowerCase().startsWith("delete") ? "delete" : "get"
  }
)

const router = GenerateRouter([MyController])
```

You can also overwrite a method by using the `HttpMethod` decorator:

```typescript
import { HttpMethod } from "route-controllers"

class TestController {
  @HttpMethod("post")
  public async GetTest() => {
    return `This is very misleading for the next developer`
  }
}
```
