import { TYPES } from './actions'

import { createWithHandlers } from '../common/reducer'

const initialState = {
  cats: [],
  expecteds: [],
  transs: [],
  isCreateSuccess: false
}

function createReset(state, action) {
  return {
    ...state,
    isCreateSuccess: false
  }
}

function createSuccess(state, action) {
  return {
    ...state,
    isCreateSuccess: true,
    transs: [action.trans].concat(state.transs)
  }
}

function findSuccess(state, action) {
  return {
    ...state,
    transs: action.transs
  }
}

function findYearMonthBudgetSuccess(state, action) {
  return {
    ...state,
    cats: action.cats,
    expecteds: action.expecteds,
    transs: action.transs
  }
}

function setCreateTransField(state, action) {
  return {
    ...state,
    createTrans: {
      ...state.createTrans,
      [action.name]: action.value
    }
  }
}

export default createWithHandlers({
  [TYPES.CREATE_RESET]: createReset,
  [TYPES.CREATE_SUCCESS]: createSuccess,
  [TYPES.FIND_ALL_SUCCESS]: findSuccess,
  [TYPES.FIND_IN_YEAR_SUCCESS]: findSuccess,
  [TYPES.FIND_IN_YEAR_MONTH_SUCCESS]: findSuccess,
  [TYPES.FIND_IN_YEAR_MONTH_BUDGET_SUCCESS]: findYearMonthBudgetSuccess,
  [TYPES.SET_CREATE_TRANS_FIELD]: setCreateTransField
}, initialState)
