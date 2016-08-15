import { TYPES } from './actions'

import { createWithHandlers } from '../common/reducer'

const initialState = {
  createTrans: {
    name: ''
  },
  transs: []
}

function findAllSuccess(state, action) {
  return {
    ...state,
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
  [TYPES.SET_CREATE_TRANS_FIELD]: setCreateTransField,
  [TYPES.FIND_ALL_SUCCESS]: findAllSuccess
}, initialState)
