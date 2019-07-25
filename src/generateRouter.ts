import * as express from 'express'
import { deduceMethodFromName } from './utils/httpMethod'
import { buildRoute } from './buildRoute'

export const generateRouter = (controllers: any[], container = null) => {
  var router = express.Router()

  for (var controller of controllers) {
    const instance = new controller()

    if (container) {
      // check to see if developer is using inversify to inject any dependencies
      const injectables = Reflect.getMetadata("inversify:tagged_props", controller)
      for (let injectable of Object.keys(injectables)) {
        instance[injectable] = container.get(injectables[injectable][0].value)
      }
    }

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

        Reflect.defineMetadata('ParameterMapper', params, handler)
      }

      let httpMethod = Reflect.getMetadata('Method', instance, method)
      let route = httpMethod ? `${controller.basePath}${httpMethod.path || method}` : `${controller.basePath}/${method}`

      if (!httpMethod) {
        httpMethod = deduceMethodFromName(method)
      }

      let middleware = Reflect.getMetadata('Middleware', instance, method)
      if (!middleware) {
        middleware = []
      }

      router[httpMethod](route, ...middleware, buildRoute(handler))
    }
  }

  return router
}