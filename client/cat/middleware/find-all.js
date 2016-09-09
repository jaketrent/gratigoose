import * as actions from '../actions'

export default function findAll(store, next) {
  // TODO: add cache check
  store.dispatch(actions.findAll())
  next()
}
