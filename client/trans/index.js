import { connect } from 'react-redux'
import React from 'react'

import CreateForm from './create-form'
import List from './list'
import renderWithState from '../common/store/render'

function mapStateToProps(state) {
  return {
    transs: state.trans.transs
  }
}

function Trans(props) {
  return (
    <div>
      <h1>Transactions</h1>
      <CreateForm />
      <List transs={props.transs} />
    </div>
  )
}

export default function render(store, el) {
  renderWithState(connect(mapStateToProps)(Trans), el)
}
