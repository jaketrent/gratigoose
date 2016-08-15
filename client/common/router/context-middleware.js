import { parse } from 'qs'

import * as actions from './actions'

export function getHost() {
  return window.location.origin
    ? window.location.origin
    : `${window.location.protocol}//${window.location.host}`
}

function formatContext(ctx) {
  return {
    currentUrl: getHost() + ctx.canonicalPath,
    params: ctx.params,
    path: ctx.pathname,
    query: parse(ctx.querystring)
  }
}

// NOTE: this has a different signature than most middleware
// It's the first, and helps the store have the appropriate routing
// information (found first in ctx)
export default function saveContextMiddleware(store, ctx, next) {
  store.dispatch(actions.transitionTo(formatContext(ctx)))
  next()
}
