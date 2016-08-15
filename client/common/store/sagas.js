import { takeEvery } from 'redux-saga'
import { fork } from 'redux-saga/effects'

import * as transActions from '../../trans/actions'
import * as transSagas from '../../trans/sagas'

export default function* root() {
  yield* [
    fork(takeEvery, transActions.TYPES.CREATE, transSagas.create),
    fork(takeEvery, transActions.TYPES.FIND_ALL, transSagas.findAll)
  ]
}
