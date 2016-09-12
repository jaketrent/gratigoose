import { connect } from 'react-redux'
import React from 'react'

import Chrome from '../common/layouts/chrome'
import List from './list'
import renderWithState from '../common/store/render'
import * as transUtils from '../trans/utils'
import * as utils from './utils'

function mapStateToProps(state) {
  return {
    transs: state.trans.transs,
    year: state.routing.params.year
  }
}

function Tithing(props) {
  const lastTithe = utils.findLastTithe(props.transs)
  const incomeSinceLastTithe = props.transs
          .filter(transUtils.sinceDate.bind(null, lastTithe ? lastTithe.date : null))
    .filter(transUtils.isIncome)
  

  return (
    <Chrome>
      <h1>Tithing</h1>
      <h2>Last Tithe</h2>
      <List transs={lastTithe ? [lastTithe] : []} />
      <h2>Income since last tithing</h2>
      <List transs={incomeSinceLastTithe} />
    </Chrome>
  )
}

export default function render(store, el) {
  renderWithState(connect(mapStateToProps)(Tithing), el)
}
