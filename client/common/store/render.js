import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import store from '../store'

export default function renderWithState(Component, el) {
  render(
    <Provider store={store}>
      <Component />
    </Provider>
  , el)
}
