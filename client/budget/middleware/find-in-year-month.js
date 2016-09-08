import * as actions from '../actions'

export default function findInYearMonth(store, next) {
  const { month, year } = store.getState().routing.params
  store.dispatch(actions.findInYearMonth({ month, year }))
  next()
}
