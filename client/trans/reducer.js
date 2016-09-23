import { createWithHandlers } from '../common/reducer'
import { TYPES } from './actions'

const initialState = {
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
    transs: action.transs.concat(state.transs)
  }
}

function findSuccess(state, action) {
  return {
    ...state,
    transs: action.transs
  }
}

function updateSuccess(state, action) {
  const transs = [...state.transs]
  const i = transs.findIndex(t => t.id === action.transs[0].id)
  transs[i] = action.transs[0]
  return {
    ...state,
    transs
  }
}

export default createWithHandlers({
  [TYPES.CREATE_RESET]: createReset,
  [TYPES.CREATE_SUCCESS]: createSuccess,
  [TYPES.FIND_ALL_SUCCESS]: findSuccess,
  [TYPES.FIND_IN_YEAR_SUCCESS]: findSuccess,
  [TYPES.FIND_IN_YEAR_MONTH_SUCCESS]: findSuccess,
  [TYPES.UPDATE_SUCCESS]: updateSuccess
}, initialState)
