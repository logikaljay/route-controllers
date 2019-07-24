/**
 * Define a controller to process
 * 
 * @param {string} [route] The name of the controller in the url
 */
export function Controller(route: string): Function {
  return (target: any) => {
    target.basePath = route
    return
  }
}

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