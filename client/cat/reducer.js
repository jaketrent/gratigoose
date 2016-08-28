import { TYPES } from './actions'

const initialState = {
  searchedCats: []
}

function searchSuccess(state, action) {
  return {
    ...state,
    searchedCats: action.cats
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
