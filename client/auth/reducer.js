import * as cookie from '../common/cookie'
import { createWithHandlers } from '../common/reducer'
import { TYPES } from './actions'

const initialState = {
  session: cookie.read('gratigooseSessionId')
}

function loginSuccess(state, action) {
  return {
    ...state,
    session: action.session
  }
}

function logout(state, action) {
  return {
    ...state,
    session: null
  }
}

export default createWithHandlers({
  [TYPES.LOGIN_SUCCESS]: loginSuccess,
  [TYPES.LOGOUT]: logout
}, initialState)

