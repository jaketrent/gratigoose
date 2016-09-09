import types from 'redux-types'

import * as alertsUtils from '../alerts/utils'

export const TYPES = types('acct',
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

export function searchSuccess(accts) {
  return {
    type: TYPES.SEARCH_SUCCESS,
    accts
  }
}

export function findAll() {
  return {
    type: TYPES.FIND_ALL
  }
}

export function findAllSuccess(accts) {
  return {
    type: TYPES.FIND_ALL_SUCCESS,
    accts
  }
}

export function findAllError(errors) {
  return {
    type: TYPES.FIND_ALL_ERROR,
    alerts: alertsUtils.createFromErrors(errors)
  }
}
