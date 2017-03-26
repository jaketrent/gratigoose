import acctFindAll from '../../acct/middleware/find-all'
import { isLoggedIn, logout } from '../../auth/middleware'
import budget from '../../budget'
import budgetFindInYearMonth from '../../budget/middleware/find-in-year-month'
import catFindAll from '../../cat/middleware/find-all'
import ingest from '../../ingest'
import login from '../../auth/login'
import transFindInYear from '../../trans/middleware/find-in-year'
import transFindInYearMonth from '../../trans/middleware/find-in-year-month'
import * as router from '../router'
import tithing from '../../tithing'
import trans from '../../trans'

export function map(basePath) {
  router.route('/', _ => { router.redirect(`/${new Date().getFullYear()}`)})
  router.route('/login', login)
  router.route('/logout', logout)
  router.route('/budget', _ => { router.redirect(`/${new Date().getFullYear()}/${new Date().getMonth() + 1}/budget`)})
  router.route('/tithing', _ => { router.redirect(`/${new Date().getFullYear()}/tithing`)})

  router.route('/ingest', isLoggedIn, acctFindAll, catFindAll, ingest)
  router.route('/:year/tithing', isLoggedIn, transFindInYear, tithing)
  router.route('/:year', isLoggedIn, transFindInYear, trans)
  router.route('/:year/:month', isLoggedIn, transFindInYearMonth, trans)
  router.route('/:year/:month/budget', isLoggedIn, budgetFindInYearMonth, budget)

  // router.route('*', notFound)

  router.start(basePath)
}
