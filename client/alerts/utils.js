const uuid = require('node-uuid')

export const levels = Object.freeze({
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
})

function convertStatusToLevel(status) {
  if (status >= 400)
    return levels.ERROR

  return levels.SUCCESS
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
  return errs.map(err => ({
    id: err.id || uuid.v4(),
    title: err.title,
    level: convertStatusToLevel(err.status) || levels.SUCCESS
  }))
}
