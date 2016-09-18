import { createWithHandlers } from '../common/reducer'
import { TYPES as TRANS_TYPES } from '../trans/actions'

const initialState = {
  doneCount: 0
}

function transCreateSuccess(state, action) {
  return {
    ...state,
    doneCount: state.doneCount + 1
  }
}

export default createWithHandlers({
  [TRANS_TYPES.CREATE_SUCCESS]: transCreateSuccess,
}, initialState)

