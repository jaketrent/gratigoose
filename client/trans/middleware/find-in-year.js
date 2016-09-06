import * as actions from '../actions'

export default function findInYear(store, next) {
  const year = store.getState().routing.params.year
  store.dispatch(actions.findInYear({ year }))
  next()
}
