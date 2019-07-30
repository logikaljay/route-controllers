import * as express from 'express'
import { deduceMethodFromName } from './utils/httpMethod'
import { buildRoute } from './buildRoute'

export const generateRouter = (controllers: any[]) => {
  var router = express.Router()

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

        Reflect.defineMetadata('ParameterMapper', params, handler)
      }

      let methodMetadata = Reflect.getMetadata('Method', instance, method)
      let route = methodMetadata 
        ? `${controller.basePath}/${methodMetadata.path || method}` 
        : `${controller.basePath}/${method}`

      if (!methodMetadata) {
        methodMetadata = {
          method: deduceMethodFromName(method)
        }
      }

      let middleware = Reflect.getMetadata('Middleware', instance, method)
      if (!middleware) {
        middleware = []
      }

      router[methodMetadata.method](route, ...middleware, buildRoute(instance, handler))
    }
  }

  return router
}