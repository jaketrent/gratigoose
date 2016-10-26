import { connect } from 'react-redux'
import React from 'react'

import * as actions from './actions'
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

function mapDispatchToProps(dispatch) {
  return {
    destroy(trans) { dispatch(actions.destroy(trans)) }
  }
}

function handleDestroyOption(props, trans) {
  if (confirm('Are you sure you want to destroy?'))
    props.destroy(trans)
}

const optionHandlers = {
  destroy: handleDestroyOption
}

function handleOptionClick(props, optionName, trans) {
  const handler = optionHandlers[optionName]
  if (typeof handler === 'function')
    handler(props, trans)
}

function Trans(props) {
  return (
    <Chrome title={<Title>Transactions</Title>}>
      <InputForm />
      <List onOptionClick={(optionName, trans) => handleOptionClick(props, optionName, trans)}
            transs={props.transs} />
    </Chrome>
  )
}

export default function render(store, el) {
  renderWithState(connect(mapStateToProps, mapDispatchToProps)(Trans), el)
}
