import 'reflect-metadata'
import { generateRouter } from "./generateRouter"
export { setHttpMethodNameMapper } from './utils/httpMethod'

export default generateRouter
export * from './utils/attributes'
