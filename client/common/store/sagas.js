import { takeEvery } from 'redux-saga'
import { fork } from 'redux-saga/effects'

import * as acctActions from '../../acct/actions'
import * as acctSagas from '../../acct/sagas'
import * as transActions from '../../trans/actions'
import * as transSagas from '../../trans/sagas'

export default function* root() {
  yield* [
    fork(takeEvery, acctActions.TYPES.SEARCH, acctSagas.search),
    fork(takeEvery, transActions.TYPES.CREATE, transSagas.create),
    fork(takeEvery, transActions.TYPES.FIND_ALL, transSagas.findAll)
  ]
}
