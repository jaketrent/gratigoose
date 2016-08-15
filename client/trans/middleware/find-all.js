import * as actions from '../actions'

export default function findAll(store, next) {
  store.dispatch(actions.findAll())
  next()
}
