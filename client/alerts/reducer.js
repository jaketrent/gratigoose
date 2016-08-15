import { TYPES } from './actions'

export const initialState = {
  alerts: [],
}

function appendAlerts(state, action) {
  return {
    ...state,
    alerts: state.alerts.concat(action.alerts)
  }
}

function dismissAlert(state, action) {
  let alerts = state.alerts.slice(0)
  alerts.splice(alerts.findIndex(e => e.id === action.id), 1)

  return {
    ...state,
    alerts 
  }
}

export default function reduce(state = initialState, action = {}) {
  if (Array.isArray(action.alerts) && action.alerts.length > 0)
    return appendAlerts(state, action)

  const handlers = {
    [TYPES.DISMISS_ALERT]: dismissAlert
  }
  return handlers[action.type]
    ? handlers[action.type](state, action)
    : state
}
