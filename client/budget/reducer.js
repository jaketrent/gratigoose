import { TYPES } from './actions'

import { createWithHandlers } from '../common/reducer'

const initialState = {
  cats: [],
  expecteds: [],
  transs: []
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
  [TYPES.FIND_IN_YEAR_MONTH_SUCCESS]: findYearMonthSuccess,
}, initialState)
