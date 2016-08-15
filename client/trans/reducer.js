import { TYPES } from './actions'

import { createWithHandlers } from '../common/reducer'

const initialState = {
  createTrans: {
    name: ''
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
  [TYPES.SET_CREATE_TRANS_FIELD]: setCreateTransField
}, initialState)
