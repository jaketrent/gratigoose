import types from 'redux-types'

import * as alertsUtils from '../alerts/utils'

export const TYPES = types('trans',
  'CREATE',
  'CREATE_SUCCESS',
  'CREATE_ERROR',
  'FIND_ALL',
  'FIND_ALL_SUCCESS',
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

export function setCreateTransField(args) {
  return {
    type: TYPES.SET_CREATE_TRANS_FIELD,
    ...args
  }
}
