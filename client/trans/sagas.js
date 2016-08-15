import { call, put } from 'redux-saga/effects'

import * as actions from './actions'
import * as api from './api'

exports.create = function* create() {
  const res = yield call(api.create)
  console.log('res', res)

  yield put(actions.createSuccess(api.deserializeSuccess(res)))
  // TODO: impl
}
