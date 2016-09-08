import { takeEvery } from 'redux-saga'
import { fork } from 'redux-saga/effects'

import * as acctActions from '../../acct/actions'
import * as acctSagas from '../../acct/sagas'
import * as budgetActions from '../../budget/actions'
import * as budgetSagas from '../../budget/sagas'
import * as catActions from '../../cat/actions'
import * as catSagas from '../../cat/sagas'
import * as transActions from '../../trans/actions'
import * as transSagas from '../../trans/sagas'

export default function* root() {
  yield* [
    fork(takeEvery, acctActions.TYPES.SEARCH, acctSagas.search),
    fork(takeEvery, catActions.TYPES.SEARCH, catSagas.search),
    fork(takeEvery, transActions.TYPES.CREATE, transSagas.create),
    fork(takeEvery, transActions.TYPES.CREATE_SUCCESS, transSagas.createSuccess),
    fork(takeEvery, transActions.TYPES.FIND_ALL, transSagas.findAll),
    fork(takeEvery, transActions.TYPES.FIND_IN_YEAR, transSagas.findInYear),
    fork(takeEvery, transActions.TYPES.FIND_IN_YEAR_MONTH, transSagas.findInYearMonth),
    fork(takeEvery, budgetActions.TYPES.FIND_IN_YEAR_MONTH, budgetSagas.findInYearMonth)
  ]
}
