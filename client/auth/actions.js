import types from 'redux-types'

import * as alertsUtils from '../alerts/utils'

export const TYPES = types('auth',
  'CREATE',
  'LOGIN',
  'LOGIN_SUCCESS',
  'LOGIN_ERROR',
  'GET_SESSION',
  'GET_SESSION_SUCCESS',
  'GET_SESSION_ERROR',
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

export function getSession() {
  return {
    type: TYPES.GET_SESSION
  }
}

export function getSessionSuccess(session) {
  return {
    type: TYPES.GET_SESSION_SUCCESS,
    session,
    alerts: [alertsUtils.createSuccess('Logged in')]
  }
}

export function getSessionError(errors) {
  return {
    type: TYPES.GET_SESSION_ERROR,
    alerts: alertsUtils.createFromErrors(errors)
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
