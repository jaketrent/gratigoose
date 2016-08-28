import types from 'redux-types'

export const TYPES = types('acct',
  'SEARCH',
  'SEARCH_SUCCESS'
)

export function search(term) {
  return {
    type: TYPES.SEARCH,
    term
  }
}

export function searchSuccess(accts) {
  return {
    type: TYPES.SEARCH_SUCCESS,
    accts
  }
}
