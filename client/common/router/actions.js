import types from 'redux-types'

export const TYPES =  types('router',
  'TRANSITION_TO'
)

export function transitionTo(context) {
  return {
    type: TYPES.TRANSITION_TO,
    context
  }
}
