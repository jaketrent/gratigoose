import types from 'redux-types'

import * as alertsUtils from '../alerts/utils'

export const TYPES = types('trans',
  'CREATE',
  'CREATE_RESET',
  'CREATE_SUCCESS',
  'CREATE_ERROR',
  'FIND_ALL',
  'FIND_ALL_SUCCESS',
  'FIND_IN_YEAR',
  'FIND_IN_YEAR_SUCCESS',
  'SET_CREATE_TRANS_FIELD'
)

export function create(trans) {
  return {
    type: TYPES.CREATE,
    trans
  }
}

export function createSuccess(trans) {
  return {
    type: TYPES.CREATE_SUCCESS,
    trans,
    alerts: alertsUtils.createSuccess('Transaction created')
  }
}

export function createReset() {
  return {
    type: TYPES.CREATE_RESET
  }
}

export function createError(errors) {
  return {
    type: TYPES.CREATE_ERROR,
    alerts: alertsUtils.createFromErrors(errors)
  }
}

export function findAll() {
  return {
    type: TYPES.FIND_ALL
  }
}

export function findAllSuccess(transs) {
  return {
    type: TYPES.FIND_ALL_SUCCESS,
    transs
  }
}

export function findInYear({ year }) {
  return {
    type: TYPES.FIND_IN_YEAR,
    year
  }
}

export function findInYearSuccess({ year, transs }) {
  return {
    type: TYPES.FIND_IN_YEAR_SUCCESS,
    year,
    transs
  }
}

export function setCreateTransField(args) {
  return {
    type: TYPES.SET_CREATE_TRANS_FIELD,
    ...args
  }
}
