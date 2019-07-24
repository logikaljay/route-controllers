import 'reflect-metadata'
import { deduceMethodFromName } from './utils/http-method'
import * as express from 'express'

export default (controllers: any[]) => {
  var router = express.Router()

  // ah func.
  let middleware = []

  for (var controller of controllers) {
    const instance = new controller()
    const methods = Reflect.ownKeys(Reflect.getPrototypeOf(instance))
      .filter(f => f !== 'constructor')

    for (let method of methods) {
      if (!instance[method]) {
        return;
      }

      method = method.toString()
      let handler = instance[method].bind(instance)
      let args = instance[method].toString().match(/\s?\(([^)]*)\)/)
      if (args.length > 0) {
        let params = args[1]
          .split(',')
          .map(arg => arg.replace(/\/\*.*\*\//, '').trim())
          .filter(arg => arg)

        Reflect.defineMetadata('ParamaterMapper', params, handler)
      }

      let httpMethod = Reflect.getMetadata('Method', instance, method)
      let route = httpMethod ? `${controller.basePath}${httpMethod.path}` : `${controller.basePath}/${method}`

      if (!httpMethod) {
        httpMethod = deduceMethodFromName(method)
      }

      router[httpMethod](route, ...middleware, buildRoute(handler))

      console.log(`Creating ${httpMethod} method ${route} for ${controller.name}`)
    }
  }

  return router
}

const buildRoute = handler => async (req: express.Request, res, next) => {
  try {
    var params = Object.assign(
      {},
      req.body,
      req.query,
      req.params,
      req.headers
    )
    
    var metadata = Reflect.getMetadata('ParameterMapper', handler)
    var input = []
    for (var key of metadata) {
      if (key === 'request' || key === 'req') {
        input.push(req)
      }
      else if (key === 'response' || key === 'res') {
        input.push(res)
      }
      else if (key === 'next')  {
        input.push(next)
      }
      else {
        input.push(params[key])
      }
    }

    var result = await handler(...input)

    if (typeof result === 'object') {
      res.json(result)
    }
    else if (typeof result === 'string') {
      if (result.indexOf('<html') > -1 || result.indexOf('<body') > -1) {
        res.writeHead(200, {
          'content-type': 'text/html'
        })
      }

      res.end(result)
    }
  }
  catch (err) {
    // ah func. need some way to handle errors
    res.status(500).json({ name: err.name, message: err.message })
  }
}
