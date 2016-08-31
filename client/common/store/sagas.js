import { takeEvery } from 'redux-saga'
import { fork } from 'redux-saga/effects'

import * as acctActions from '../../acct/actions'
import * as acctSagas from '../../acct/sagas'
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
    fork(takeEvery, transActions.TYPES.FIND_ALL, transSagas.findAll)
  ]
}
