import subject from '../reducer'
import { TYPES } from '../actions'

test('TYPES.APPEND_ALERTS concats alerts', () => {
  const state = { alerts: [1] }
  const action = { type: TYPES.APPEND_ALERTS, alerts: [2, 3] }
  expect(subject(state, action).alerts).toEqual([1, 2, 3])
})

test('TYPES.DISMISS_ALERT removes a specific alert', () => {
  const state = { alerts: [{ id: 1 }, { id: 2 }, { id: 3 }] }
  const action = { type: TYPES.DISMISS_ALERT, id: 2 }
  expect(subject(state, action).alerts).toEqual([{ id: 1 }, { id: 3 }])
})

test('appends any alerts for any actions', () => {
  const state = { alerts: [1] }
  const alert = { id: 'someId', title: 'someTitle' }
  const action = { type: 'someType', alerts: [alert] }
  expect(subject(state, action).alerts).toEqual([1, alert])
})
