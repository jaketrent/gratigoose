export function createWithHandlers(handlers, initialState = {}) {
  return function reduce(state = initialState, action = {}) {
    return handlers[action.type]
      ? handlers[action.type](state, action)
      : state
  }
}
