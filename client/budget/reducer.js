import { TYPES } from './actions'

import { createWithHandlers } from '../common/reducer'

const initialState = {
  cats: [],
  expecteds: [],
  transs: []
}

function createExpectedSuccess(state, action) {
  return {
    ...state,
    expecteds: state.expecteds.concat([action.expected])
  }
}

function findYearMonthSuccess(state, action) {
  return {
    ...state,
    cats: action.cats,
    expecteds: action.expecteds,
    transs: action.transs
  }
}

export default createWithHandlers({
  [TYPES.CREATE_EXPECTED_SUCCESS]: createExpectedSuccess,
  [TYPES.FIND_IN_YEAR_MONTH_SUCCESS]: findYearMonthSuccess,
}, initialState)
