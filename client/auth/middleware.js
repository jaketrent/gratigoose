import * as router from '../common/router'
import store from '../common/store'

export function isLoggedIn(store, next) {
  if (store.getState().auth.session) {
    next()
  } else {
    router.redirect('/login')
  }
}
