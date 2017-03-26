import { takeEvery } from 'redux-saga'
import { fork } from 'redux-saga/effects'

import * as acctActions from '../../acct/actions'
import * as acctSagas from '../../acct/sagas'
import * as authActions from '../../auth/actions'
import * as authSagas from '../../auth/sagas'
import * as budgetActions from '../../budget/actions'
import * as budgetSagas from '../../budget/sagas'
import * as catActions from '../../cat/actions'
import * as catSagas from '../../cat/sagas'
import * as ingestActions from '../../ingest/actions'
import * as ingestSagas from '../../ingest/sagas'
import * as transActions from '../../trans/actions'
import * as transSagas from '../../trans/sagas'

export default function* root() {
  yield* [
    fork(takeEvery, acctActions.TYPES.FIND_ALL, acctSagas.findAll),
    fork(takeEvery, acctActions.TYPES.SEARCH, acctSagas.search),
    fork(takeEvery, authActions.TYPES.LOGIN, authSagas.login),
    fork(takeEvery, authActions.TYPES.GET_SESSION, authSagas.getSession),
    fork(takeEvery, authActions.TYPES.LOGOUT, authSagas.logout),
    fork(takeEvery, catActions.TYPES.FIND_ALL, catSagas.findAll),
    fork(takeEvery, catActions.TYPES.SEARCH, catSagas.search),
    fork(takeEvery, budgetActions.TYPES.CREATE_EXPECTED, budgetSagas.createExpected),
    fork(takeEvery, budgetActions.TYPES.FIND_IN_YEAR_MONTH, budgetSagas.findInYearMonth),
    fork(takeEvery, budgetActions.TYPES.UPDATE_EXPECTED, budgetSagas.updateExpected),
    fork(takeEvery, ingestActions.TYPES.UPLOAD, ingestSagas.upload),
    fork(takeEvery, transActions.TYPES.CREATE, transSagas.create),
    fork(takeEvery, transActions.TYPES.CREATE_SUCCESS, transSagas.createSuccess),
    fork(takeEvery, transActions.TYPES.DESTROY, transSagas.destroy),
    fork(takeEvery, transActions.TYPES.UPDATE, transSagas.update),
    fork(takeEvery, transActions.TYPES.FIND_ALL, transSagas.findAll),
    fork(takeEvery, transActions.TYPES.FIND_IN_YEAR, transSagas.findInYear),
    fork(takeEvery, transActions.TYPES.FIND_IN_YEAR_MONTH, transSagas.findInYearMonth)
  ]
}
