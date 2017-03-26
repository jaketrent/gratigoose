import types from 'redux-types'

import * as alertsUtils from '../alerts/utils'
import * as cookie from '../common/cookie'

export const TYPES = types('auth',
  'LOGIN',
  'LOGIN_SUCCESS',
  'LOGIN_ERROR',
  'LOGOUT',
  'LOGOUT_SUCCESS',
  'LOGOUT_ERROR'
)

export function login(username, password) {
  return {
    type: TYPES.LOGIN,
    username,
    password
  }
}

export function loginSuccess(session) {
  return {
    type: TYPES.LOGIN_SUCCESS,
    session,
    alerts: [alertsUtils.createSuccess('Logged in')]
  }
}

export function loginError(errors) {
  return {
    type: TYPES.LOGIN_ERROR,
    alerts: alertsUtils.createFromErrors(errors)
  }
}

export function logout() {
  cookie.destroy('gratigooseSessionId')
  return {
    type: TYPES.LOGOUT
  }
}

export function logoutSuccess() {
  return {
    type: TYPES.LOGOUT_SUCCESS,
    alerts: [alertsUtils.createSuccess('Logged out')]
  }
}

export function logoutError(errors) {
  return {
    type: TYPES.LOGOUT_ERROR,
    alerts: alertsUtils.createFromErrors(errors)
  }
}
