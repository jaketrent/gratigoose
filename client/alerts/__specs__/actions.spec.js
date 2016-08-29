import test from 'ava'

import * as subject from '../actions'

test('#alert returns payload', t => {
  const alerts = [{ some: 'alerts' }]
  t.deepEqual(subject.alert(alerts), {
    type: subject.TYPES.APPEND_ALERTS,
    alerts
  })
})

test('#alertMsg returns payload', t => {
  const msg = 'Some text'
  const actual = subject.alertMsg(msg)
  t.truthy(actual.type === subject.TYPES.APPEND_ALERTS)
  t.truthy(actual.alerts[0].title === msg)
})

test('#dismissError returns payload', t => {
  const id = 'someId'
  t.deepEqual(subject.dismissAlert(id), {
    type: subject.TYPES.DISMISS_ALERT,
    id
  })
})
