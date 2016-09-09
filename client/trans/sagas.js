import { call, put, select } from 'redux-saga/effects'

import * as acctSagas from '../acct/sagas'
import * as actions from './actions'
import * as api from './api'
import * as catSagas from '../cat/sagas'
import request from '../common/api/request'

export function* create({ trans }) {
  try {
    const { accts, cats } = yield* loadTransRelations()
    const des = yield call(request, { accts, api: api.create, cats, trans })

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
  const { accts, cats } = yield* loadTransRelations()
  const des = yield call(request, { accts, api: api.findAll, cats })

  yield put(actions.findAllSuccess(des))
  // TODO: impl and error check
}

export function* loadTransRelations() {
  let { accts, cats } = yield select((state) => ({
    accts: state.acct.accts,
    cats: state.cat.cats,
  }))
  if (accts.length === 0) 
    accts = yield* acctSagas.findAll()
  if (cats.length === 0)
    cats = yield* catSagas.findAll()

  return { accts, cats }
}

export function* findInYear({ year }) {
  const { accts, cats } = yield* loadTransRelations()
  const transs = yield call(request, { accts, api: api.findInYear, cats, year })

  yield put(actions.findInYearSuccess({ transs, year }))
  // TODO: impl and error check 
}

export function* findInYearMonth({ month, year }) {
  const { accts, cats } = yield* loadTransRelations()
  const transs = yield call(request, { accts, api: api.findInYearMonth, cats, month, year })

  yield put(actions.findInYearMonthSuccess({ month, transs, year }))
  // TODO: impl and error check 
}
