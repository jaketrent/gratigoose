import types from 'redux-types'

import * as alertsUtils from '../alerts/utils'

export const TYPES = types('budget',
  'CREATE_EXPECTED',
  'CREATE_EXPECTED_SUCCESS',
  'CREATE_EXPECTED_ERROR',
  'FIND_IN_YEAR_MONTH',
  'FIND_IN_YEAR_MONTH_SUCCESS',
  'UPDATE_EXPECTED',
  'UPDATE_EXPECTED_SUCCESS',
  'UPDATE_EXPECTED_ERROR'
)

export function createExpected(args) {
  return {
    ...args,
    type: TYPES.CREATE_EXPECTED
  }
}

export function createExpectedSuccess(expecteds) {
  return {
    type: TYPES.CREATE_EXPECTED_SUCCESS,
    expecteds,
    alerts: [alertsUtils.createSuccess('Expected created')]
  }
}

export function createExpectedError(errors) {
  return {
    type: TYPES.CREATE_EXPECTED_ERROR,
    alerts: alertsUtils.createFromErrors(errors)
  }
}

export function findInYearMonth({ month, year }) {
  return {
    type: TYPES.FIND_IN_YEAR_MONTH,
    month,
    year
  }
}

export function findInYearMonthSuccess({ cats, expecteds, month, transs, year }) {
  return {
    type: TYPES.FIND_IN_YEAR_MONTH_SUCCESS,
    cats,
    expecteds,
    month,
    transs,
    year
  }
}

export function updateExpected(args) {
  return {
    ...args,
    type: TYPES.UPDATE_EXPECTED
  }
}

export function updateExpectedSuccess(expecteds) {
  return {
    type: TYPES.UPDATE_EXPECTED_SUCCESS,
    expecteds,
    alerts: [alertsUtils.createSuccess('Expected updated')]
  }
}

export function updateExpectedError(errors) {
  return {
    type: TYPES.UPDATE_EXPECTED_ERROR,
    alerts: alertsUtils.createFromErrors(errors)
  }
}
