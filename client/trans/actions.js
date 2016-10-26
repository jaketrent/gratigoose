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
  'FIND_IN_YEAR_MONTH',
  'FIND_IN_YEAR_MONTH_SUCCESS',
  'SET_CREATE_TRANS_FIELD',
  'UPDATE',
  'UPDATE_SUCCESS',
  'UPDATE_ERROR',
  'DESTROY',
  'DESTROY_SUCCESS',
  'DESTROY_ERROR'
)

export function create(trans) {
  return {
    type: TYPES.CREATE,
    trans
  }
}

export function createSuccess(transs) {
  return {
    type: TYPES.CREATE_SUCCESS,
    transs,
    alerts: [alertsUtils.createSuccess('Transaction created')]
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

export function findInYearMonth({ month, year }) {
  return {
    type: TYPES.FIND_IN_YEAR_MONTH,
    month,
    year
  }
}

export function findInYearMonthSuccess({ month, transs, year }) {
  return {
    type: TYPES.FIND_IN_YEAR_MONTH_SUCCESS,
    month,
    year,
    transs
  }
}

export function update(trans) {
  return {
    type: TYPES.UPDATE,
    trans
  }
}

export function updateSuccess(transs) {
  return {
    type: TYPES.UPDATE_SUCCESS,
    transs,
    alerts: [alertsUtils.createSuccess('Transaction updated')]
  }
}

export function updateError(errors) {
  return {
    type: TYPES.UPDATE_ERROR,
    alerts: alertsUtils.createFromErrors(errors)
  }
}

export function destroy(trans) {
  return {
    type: TYPES.DESTROY,
    trans
  }
}

export function destroySuccess(trans) {
  return {
    type: TYPES.DESTROY_SUCCESS,
    trans,
    alerts: [alertsUtils.createSuccess('Transaction destroyed')]
  }
}

export function destroyError(errors) {
  return {
    type: TYPES.DESTROY_ERROR,
    alerts: alertsUtils.createFromErrors(errors)
  }
}
