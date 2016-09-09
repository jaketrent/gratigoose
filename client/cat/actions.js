import types from 'redux-types'

export const TYPES = types('cat',
  'FIND_ALL',
  'FIND_ALL_SUCCESS',
  'FIND_ALL_ERROR',
  'SEARCH',
  'SEARCH_SUCCESS'
)

export function search(term) {
  return {
    type: TYPES.SEARCH,
    term
  }
}

export function searchSuccess(cats) {
  return {
    type: TYPES.SEARCH_SUCCESS,
    cats
  }
}

export function findAll() {
  return {
    type: TYPES.FIND_ALL
  }
}

export function findAllSuccess(cats) {
  return {
    type: TYPES.FIND_ALL_SUCCESS,
    cats
  }
}

export function findAllError(errors) {
  return {
    type: TYPES.FIND_ALL_ERROR,
    alerts: alertsUtils.createFromErrors(errors)
  }
}
