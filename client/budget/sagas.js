import { call, put } from 'redux-saga/effects'

import * as actions from './actions'
import * as api from './api'
import request from '../common/api/request'
import * as transSagas from '../trans/sagas'

export function* findInYearMonth({ month, year }) {
  const { accts, cats } = yield* transSagas.loadTransRelations()
  const { expecteds, transs } = yield call(request, { accts, api: api.findInYearMonth, cats, month, year })

  yield put(actions.findInYearMonthSuccess({ cats, expecteds, month, transs, year }))
  // TODO: impl and error check 
}

export function* createExpected(args) {
  const expected = yield call(request, { ...args, api: api.createExpected })

  yield put(actions.createExpectedSuccess({ expected }))
  // TODO: impl and error check 
}
