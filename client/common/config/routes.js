import budget from '../../budget'
import transFindInYear from '../../trans/middleware/find-in-year'
import transFindInYearMonth from '../../trans/middleware/find-in-year-month'
import transFindInYearMonthBudget from '../../trans/middleware/find-in-year-month-budget'
import * as router from '../router'
import trans from '../../trans'

export function map(basePath) {
  router.route('/', _ => { router.redirect(`/${new Date().getFullYear()}`)})
  router.route('/:year', transFindInYear, trans)
  router.route('/:year/:month', transFindInYearMonth, trans)
  router.route('/:year/:month/budget', transFindInYearMonthBudget, budget)

  // router.route('*', notFound)

  router.start(basePath)
}
