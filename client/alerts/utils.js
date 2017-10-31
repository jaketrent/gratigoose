const uuid = require('uuid')

export const AUTO_DISMISS_DELAY = 1000

export const levels = Object.freeze({
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
})

function convertStatusToLevel(status) {
  if (status >= 400) return levels.ERROR
  else if (status >= 200) return levels.SUCCESS
}

export function create(title, level) {
  return {
    id: uuid.v4(),
    title,
    level: level || levels.SUCCESS
  }
}

export function createSuccess(title) {
  return create(title, levels.SUCCESS)
}

export function createError(title) {
  return create(title, levels.ERROR)
}

export function createFromErrors(errs) {
  if (errs && !Array.isArray(errs)) errs = [errs]

  return errs.map(err => {
    if (err instanceof Error) console.error(err)

    return {
      id: err.id || uuid.v4(),
      title: err.title || err.message,
      level: convertStatusToLevel(err.status) || levels.ERROR
    }
  })
}

export function hasAlerts(action) {
  return action && Array.isArray(action.alerts) && action.alerts.length > 0
}

export function isSuccess(alert) {
  return alert && alert.level === levels.SUCCESS
}
