import { call, put } from 'redux-saga/effects'

import * as actions from './actions'
import * as api from './api'
import request from '../common/api/request'

export function* search({ term }) {
  const cats = yield call(request, { api: api.search, term })

  yield put(actions.searchSuccess(cats))
  // TODO: error check?
}
