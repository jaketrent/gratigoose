import { call, put, select } from 'redux-saga/effects'

import * as actions from './actions'
import * as api from './api'
import request from '../common/api/request'

export function* login({ username, password }) {
  try {
    const session = yield call(request, { api: api.create, password, username })

    yield put(actions.loginSuccess(session))
  } catch (errors) {
    yield put(actions.loginError(errors))
  }
}

export function* getSession() {
  try {
    const session = yield call(request, { api: api.show })

    yield put(actions.getSessionSuccess(session))
  } catch (errors) {
    yield put(actions.getSessionError(errors))
  }
}

export function* logout() {
  try {
    yield call(request, { api: api.destroy })

    yield put(actions.logoutSuccess())
  } catch (errors) {
    yield put(actions.logoutError(errors))
  }
}
