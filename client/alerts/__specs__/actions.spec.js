import * as subject from '../actions'

test('#alert returns payload', () => {
  const alerts = [{ some: 'alerts' }]
  expect(subject.alert(alerts)).toEqual({
    type: subject.TYPES.APPEND_ALERTS,
    alerts
  })
})

test('#alertMsg returns payload', () => {
  const msg = 'Some text'
  const actual = subject.alertMsg(msg)
  expect(actual.type === subject.TYPES.APPEND_ALERTS).toBeTruthy()
  expect(actual.alerts[0].title === msg).toBeTruthy()
})

test('#dismissError returns payload', () => {
  const id = 'someId'
  expect(subject.dismissAlert(id)).toEqual({
    type: subject.TYPES.DISMISS_ALERT,
    id
  })
})
