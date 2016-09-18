import { call, put, select } from 'redux-saga/effects'

import * as actions from './actions'
import { formatTrans } from './utils'
import * as transActions from '../trans/actions'

export function* upload({ acct, cat, columns, rows }) {
  try {
    if (!cat) throw new Error('Uploading without ingest cat')

    for (let i = 0; i < rows.length; ++i) {
      const row = rows[i]
      const trans = formatTrans({ acct, cat, columns, row })
      yield put(transActions.create(trans))
    }

    yield put(actions.uploadSuccess(rows.length))
  } catch (errs) {
    yield put(actions.uploadError(errs))
  }
}
