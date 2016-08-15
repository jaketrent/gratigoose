import transFindAll from '../../trans/middleware/find-all'
import * as router from '../router'
import trans from '../../trans'

export function map(basePath) {
  router.route('/', transFindAll, trans)

  // router.route('*', notFound)

  router.start(basePath)
}
