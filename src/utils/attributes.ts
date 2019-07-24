/**
 * Define a controller to process
 * 
 * @param {string} [route] The name of the controller in the url
 */
let Controller = null;
try {
  Controller = require("bpc").Controller
}
catch (e) {
  Controller = (route: string): Function => {
    return (target: any) => {
      target.basePath = route
      return
    }
  }
}
export { Controller }

/**
 * Define a controller to process
 * 
 * @param {string} [route] The name of the controller in the url
 */
export function HttpMethod(method, path): Function {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata('Method', { method, path }, target, propertyKey)
  }
}

export function Middleware(middleware: Function[]): Function {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata('Middleware', middleware, target, propertyKey)
  }
}