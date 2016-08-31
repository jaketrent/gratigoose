import { call, put } from 'redux-saga/effects'

import * as actions from './actions'
import * as api from './api'
import request from '../common/api/request'

export function* create({ trans }) {
  try {
    const des = yield call(request, { api: api.create, trans })

    yield put(actions.createSuccess(des))
  } catch (errors) {
    yield put(actions.createError(errors))
  }
}

export function* createSuccess(successPayload) {
  put(successPayload)
  put(actions.createReset())
}

export function* findAll() {
  const des = yield call(request, { api: api.findAll })

  yield put(actions.findAllSuccess(des))
  // TODO: impl and error check 
}
