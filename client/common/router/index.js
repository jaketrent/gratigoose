import page from 'page'
import store from '../store'

import contextMiddleware from './context-middleware'
import * as domUtils from '../dom'
import * as urlUtils from '../url'

export function route(url, ...handlers) {
  const lastHandler = handlers.pop()
  function render() {
    lastHandler(store, domUtils.getAppNode())
  }
  const middleware = handlers.map(handler => {
    return function pipe(ctx, next) {
      handler(store, next)
    }
  })

  page(url, contextMiddleware.bind(this, store), ...middleware, render)
}

export function go(url) {
  page(url)
}

export function redirect(url) {
  if (urlUtils.isCanonicalUrl(url))
    window.location = url
  else
    page.redirect(url)
}

export function back() {
  window.history.go(-1)
}

export function start(basePath) {
  page.base(basePath)
  page()
}
