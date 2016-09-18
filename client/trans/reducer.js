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

// TODO: is this used?
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
  [TYPES.SET_CREATE_TRANS_FIELD]: setCreateTransField
}, initialState)
