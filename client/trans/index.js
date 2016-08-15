import React from 'react'

import renderWithState from '../common/store/render'

function Trans() {
  return (
    <h1>Transactions</h1>
  )
}

export default function render(store, el) {
  renderWithState(Trans, el)
}
