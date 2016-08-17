import { connect } from 'react-redux'
import React from 'react'

import * as actions from './actions'
import CreateForm from './create-form'
import List from './list'
import renderWithState from '../common/store/render'
import * as utils from './utils'

const ENTER = 13

function mapStateToProps(state) {
  return {
    createTrans: state.trans.createTrans,
    transs: state.trans.transs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    create(trans) { dispatch(actions.create(trans)) },
    setCreateTransField(name, value) {
      dispatch(actions.setCreateTransField({ name, value }))
    }
  }
}

function handleFieldChange(props, evt) {
  props.setCreateTransField(evt.target.name, evt.target.value)
}

function handleSubmit(props, evt) {
  evt.preventDefault()
  if (utils.hasRequiredFields(props.createTrans))
    props.create(props.createTrans)
}

function Trans(props) {
  return (
    <div>
      <h1>Transactions</h1>
      <CreateForm errors={[]}
                  onFieldChange={e => handleFieldChange(props, e)}
                  onSubmit={e => handleSubmit(props, e)}
                  trans={props.createTrans} />
      <List transs={props.transs} />
    </div>
  )
}

export default function render(store, el) {
  renderWithState(connect(mapStateToProps, mapDispatchToProps)(Trans), el)
}
