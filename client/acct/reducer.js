import { TYPES } from './actions'

const initialState = {
  searchedAccts: []
}

function searchSuccess(state, action) {
  return {
    ...state,
    searchedAccts: action.accts
  }
}

export default function reduce(state = initialState, action = {}) {
  const handlers = {
    [TYPES.SEARCH_SUCCESS]: searchSuccess
  }
  return handlers[action.type]
    ? handlers[action.type](state, action)
    : state
}
