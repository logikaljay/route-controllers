import * as express from "express"

export const buildRoute = (instance, handler) => async (req: express.Request, res, next) => {
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

    const httpContext = Reflect.getMetadata("HttpContext", req);
    if (httpContext && httpContext.container) {
        instance.httpContext = httpContext

        const injectables = Reflect.getMetadata("inversify:tagged_props", instance.constructor);
        for (let injectable of Object.keys(injectables)) {
            instance[injectable] = httpContext.container.get(injectables[injectable][0].value);
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