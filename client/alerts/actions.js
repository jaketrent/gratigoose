import types from 'redux-types'

import * as alertUtils from './utils'

export const TYPES = types('alerts',
  'APPEND_ALERTS',
  'DISMISS_ALERT'
)

export function alert(alerts) {
  return {
    type: TYPES.APPEND_ALERTS,
    alerts
  }
}

export function alertMsg(msg) {
  return {
    type: TYPES.APPEND_ALERTS,
    alerts: [alertUtils.create(msg)]
  }
}

export function dismissAlert(id) {
  return {
    type: TYPES.DISMISS_ALERT,
    id
  }
}
