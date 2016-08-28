import types from 'redux-types'

export const TYPES = types('cat',
  'SEARCH',
  'SEARCH_SUCCESS'
)

export function search(term) {
  return {
    type: TYPES.SEARCH,
    term
  }
}

export function searchSuccess(cats) {
  return {
    type: TYPES.SEARCH_SUCCESS,
    cats
  }
}
