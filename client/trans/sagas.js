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

export function* findInYear({ year }) {
  const transs = yield call(request, { api: api.findInYear, year })

  yield put(actions.findInYearSuccess({ transs, year }))
  // TODO: impl and error check 
}

export function* findInYearMonth({ month, year }) {
  const transs = yield call(request, { api: api.findInYearMonth, month, year })

  yield put(actions.findInYearMonthSuccess({ month, transs, year }))
  // TODO: impl and error check 
}

export function* findInYearMonthBudget({ month, year }) {
  const { cats, expecteds, transs } = yield call(request, { api: api.findInYearMonthBudget, month, year })

  yield put(actions.findInYearMonthBudgetSuccess({ cats, expecteds, month, transs, year }))
  // TODO: impl and error check 
}
