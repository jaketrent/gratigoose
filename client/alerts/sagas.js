import { call, put } from 'redux-saga/effects'

import * as actions from './actions'
import pause from '../common/pause'

const pauseStepDefault = 700

export function* dismissAll(alerts, pauseStep = pauseStepDefault) {
  const ids = alerts.map(a => a.id)
  for (let i = 0; i < ids.length; ++i) {
    yield call(pause, { millis: pauseStep * (i + 1) })
    yield put(actions.dismissAlert(ids[i]))
  }
}
