import * as actions from '../actions'

export default function findInYearMonthBudget(store, next) {
  const { month, year } = store.getState().routing.params
  store.dispatch(actions.findInYearMonthBudget({ month, year }))
  next()
}
