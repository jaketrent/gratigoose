import * as config from '../config'
import { TYPES } from './actions'

export const initialState = {
  basePath: config.at('appBaseUrl'),
  path: null,
  params: {},
  query: {}
}

function handleTransitionTo(state, action) {
  return {
    ...state,
    currentUrl: action.context.currentUrl,
    params: action.context.params,
    path: action.context.path,
    query: action.context.query
  }
}

export default function reduce(state = initialState, action = {}) {
  const handlers = {
    [TYPES.TRANSITION_TO]: handleTransitionTo
  }

  return handlers[action.type]
    ? handlers[action.type](state, action)
    : state
}
