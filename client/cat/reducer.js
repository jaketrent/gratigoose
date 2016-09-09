import { TYPES } from './actions'

const initialState = {
  cats: [],
  searchedCats: []
}

function searchSuccess(state, action) {
  return {
    ...state,
    searchedCats: action.cats
  }
}

function findAllSuccess(state, action) {
  return {
    ...state,
    cats: action.cats
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
