import React from 'react'

import CreateForm from './create-form'
import renderWithState from '../common/store/render'

function Trans(props) {
  return (
    <div>
      <h1>Transactions</h1>
      <CreateForm />
    </div>
  )
}

export default function render(store, el) {
  renderWithState(Trans, el)
}
