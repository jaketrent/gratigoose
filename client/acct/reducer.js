import { TYPES } from './actions'

const initialState = {
  accts: [],
  searchedAccts: []
}

function searchSuccess(state, action) {
  return {
    ...state,
    searchedAccts: action.accts
  }
}

function findAllSuccess(state, action) {
  return {
    ...state,
    accts: action.accts
  }
}

export default function reduce(state = initialState, action = {}) {
  const handlers = {
    [TYPES.FIND_ALL_SUCCESS]: findAllSuccess,
    [TYPES.SEARCH_SUCCESS]: searchSuccess
  }
  return handlers[action.type]
    ? handlers[action.type](state, action)
    : state
}
