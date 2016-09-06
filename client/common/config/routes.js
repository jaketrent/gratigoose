import transFindInYear from '../../trans/middleware/find-in-year'
import transFindInYearMonth from '../../trans/middleware/find-in-year-month'
import * as router from '../router'
import trans from '../../trans'

export function map(basePath) {
  router.route('/', _ => { router.redirect(`/${new Date().getFullYear()}`)})
  router.route('/:year', transFindInYear, trans)
  router.route('/:year/:month', transFindInYearMonth, trans)

  // router.route('*', notFound)

  router.start(basePath)
}
