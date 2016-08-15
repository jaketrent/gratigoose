import { call, put } from 'redux-saga/effects'

import * as actions from './actions'
import * as api from './api'
import request from '../common/api/request'

exports.create = function* create({ trans }) {
  console.log('CREATE saga')
  const des = yield call(request, { api: api.create, trans })
  console.log('res', res)

  yield put(actions.createSuccess(des))
  // TODO: impl
}
