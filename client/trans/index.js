import { connect } from 'react-redux'
import React from 'react'

import Chrome from '../common/layouts/chrome'
import InputForm from './input-form'
import List from './list'
import renderWithState from '../common/store/render'
import Title from '../common/components/title'

function mapStateToProps(state) {
  return {
    transs: state.trans.transs
  }
}

function Trans(props) {
  return (
    <Chrome title={<Title>Transactions</Title>}>
      <InputForm />
      <List transs={props.transs} />
    </Chrome>
  )
}

export default function render(store, el) {
  renderWithState(connect(mapStateToProps)(Trans), el)
}
