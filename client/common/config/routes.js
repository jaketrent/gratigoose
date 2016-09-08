import budget from '../../budget'
import budgetFindInYearMonth from '../../budget/middleware/find-in-year-month'
import transFindInYear from '../../trans/middleware/find-in-year'
import transFindInYearMonth from '../../trans/middleware/find-in-year-month'
import * as router from '../router'
import trans from '../../trans'

export function map(basePath) {
  router.route('/', _ => { router.redirect(`/${new Date().getFullYear()}`)})
  router.route('/budget', _ => { router.redirect(`/${new Date().getFullYear()}/${new Date().getMonth() + 1}/budget`)})

  router.route('/:year', transFindInYear, trans)
  router.route('/:year/:month', transFindInYearMonth, trans)
  router.route('/:year/:month/budget', budgetFindInYearMonth, budget)

  // router.route('*', notFound)

  router.start(basePath)
}
