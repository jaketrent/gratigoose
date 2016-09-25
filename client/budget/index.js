import { connect } from 'react-redux'
import React from 'react'

import Chrome from '../common/layouts/chrome'
import * as actions from './actions'
import List from './list'
import renderWithState from '../common/store/render'
import Summary from './summary'
import Title from '../common/components/title'

function mapStateToProps(state) {
  return {
    cats: state.cat.cats,
    expecteds: state.budget.expecteds,
    month: state.routing.params.month,
    transs: state.budget.transs,
    year: state.routing.params.year
  }
}

function Budget(props) {
  return (
    <Chrome title={<Title>Budget</Title>}>
      <Summary expecteds={props.expecteds}
               transs={props.transs} />
      <List cats={props.cats}
            expecteds={props.expecteds}
            month={props.month}
            transs={props.transs}
            year={props.year} />
    </Chrome>
  )
}

export default function render(store, el) {
  renderWithState(connect(mapStateToProps)(Budget), el)
}
