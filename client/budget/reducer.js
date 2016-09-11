import { TYPES } from './actions'

import { createWithHandlers } from '../common/reducer'

const initialState = {
  expecteds: [],
  transs: []
}

function createExpectedSuccess(state, action) {
  return {
    ...state,
    expecteds: state.expecteds.concat(action.expecteds)
  }
}

function updateExpectedSuccess(state, action) {
  const newEx = action.expecteds[0]
  const expecteds = [...state.expecteds]
  const i = expecteds.findIndex(ex => ex.id === newEx.id)
  expecteds[i] = newEx
  return {
    ...state,
    expecteds
  }
}

function findYearMonthSuccess(state, action) {
  return {
    ...state,
    expecteds: action.expecteds,
    transs: action.transs
  }
}

export default createWithHandlers({
  [TYPES.CREATE_EXPECTED_SUCCESS]: createExpectedSuccess,
  [TYPES.FIND_IN_YEAR_MONTH_SUCCESS]: findYearMonthSuccess,
  [TYPES.UPDATE_EXPECTED_SUCCESS]: updateExpectedSuccess
}, initialState)
