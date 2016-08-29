import test from 'ava'

import subject from '../reducer'
import { TYPES } from '../actions'

test('TYPES.APPEND_ALERTS concats alerts', t => {
  const state = { alerts: [1] }
  const action = { type: TYPES.APPEND_ALERTS, alerts: [2, 3] }
  t.deepEqual(subject(state, action).alerts, [1, 2, 3])
})

test('TYPES.DISMISS_ALERT removes a specific alert', t => {
  const state = { alerts: [{ id: 1 }, { id: 2 }, { id: 3 }] }
  const action = { type: TYPES.DISMISS_ALERT, id: 2 }
  t.deepEqual(subject(state, action).alerts, [{ id: 1 }, { id: 3 }])
})

test('appends any alerts for any actions', t => {
  const state = { alerts: [1] }
  const alert = { id: 'someId', title: 'someTitle' } 
  const action = { type: 'someType', alerts: [alert] }
  t.deepEqual(subject(state, action).alerts, [1, alert])
})
