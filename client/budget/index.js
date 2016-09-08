import { connect } from 'react-redux'
import React from 'react'

import Chrome from '../common/layouts/chrome'
import * as actions from './actions'
import List from './list'
import renderWithState from '../common/store/render'
import Summary from './summary'

function mapStateToProps(state) {
  return {
    cats: state.budget.cats,
    expecteds: state.budget.expecteds,
    month: state.routing.params.month,
    transs: state.budget.transs,
    year: state.routing.params.year
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createExpected(args) { dispatch(actions.createExpected(args)) },
    updateExpected(args) { dispatch(actions.updateExpected(args)) }
  }
}

function handleExpectedSubmit(props, evt, catId, expectedId) {
  const amt = evt.target.value
  const { year, month } = props
  if (expectedId)
    props.updateExpected({ id: expectedId, catId, amt })
  else
    props.createExpected({ catId, amt, year, month })
}

function Budget(props) {
  return (
    <Chrome>
      <h1>Budget</h1>
      <Summary expecteds={props.expecteds}
               transs={props.transs} />
      <List cats={props.cats}
            expecteds={props.expecteds}
            onExpectedSubmit={handleExpectedSubmit.bind(null, props)}
            transs={props.transs} />
    </Chrome>
  )
}

export default function render(store, el) {
  renderWithState(connect(mapStateToProps, mapDispatchToProps)(Budget), el)
}
