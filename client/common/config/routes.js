import * as router from '../router'
import trans from '../../trans'

export function map(basePath) {
  router.route('/', trans)

  // router.route('*', notFound)

  router.start(basePath)
}
