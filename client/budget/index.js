import { connect } from 'react-redux'
import React from 'react'

import Alerts from '../alerts'
import Debug from '../debug'
import List from './list'
import renderWithState from '../common/store/render'
import Summary from './summary'

function mapStateToProps(state) {
  return {
    cats: state.trans.cats,
    expecteds: state.trans.expecteds,
    month: state.routing.params.month,
    transs: state.trans.transs,
    year: state.routing.params.year
  }
}

function Budget(props) {
  return (
    <div>
      <Debug />
      <h1>Budget</h1>
      <Summary expecteds={props.expecteds}
               transs={props.transs} />
      <List cats={props.cats}
            expecteds={props.expecteds}
            transs={props.transs} />
      <Alerts />
    </div>
  )
}

export default function render(store, el) {
  renderWithState(connect(mapStateToProps)(Budget), el)
}
