import { connect } from 'react-redux'
import React from 'react'

import Alerts from '../alerts'
import CreateForm from './create-form'
import Debug from '../debug'
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
      <Debug />
      <h1>Transactions</h1>
      <CreateForm />
      <List transs={props.transs} />
      <Alerts />
    </div>
  )
}

export default function render(store, el) {
  renderWithState(connect(mapStateToProps)(Trans), el)
}
