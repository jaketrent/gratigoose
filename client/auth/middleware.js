import * as actions from './actions'
import * as router from '../common/router'
import store from '../common/store'

export function isLoggedIn(store, next) {
  if (store.getState().auth.session) {
    next()
  } else {
    router.redirect('/login')
  }
}

export function logout(store) {
  store.dispatch(actions.logout())
  router.redirect('/login')
}
