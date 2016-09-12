import { connect } from 'react-redux'
import React from 'react'

import * as amtUtils from '../common/amt'
import Chrome from '../common/layouts/chrome'
import List from './list'
import renderWithState from '../common/store/render'
import Total from '../common/components/total'
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
    .filter(amtUtils.amtGtZero)
  const incomeTotal = amtUtils.sumWhereAmt(incomeSinceLastTithe)
  const tithingOwed = incomeTotal / 10

  return (
    <Chrome>
      <h1>Tithing</h1>
      <h2>Last Tithe</h2>
      <List transs={lastTithe ? [lastTithe] : []} />
      <h2>Income since last tithing</h2>
      <List transs={incomeSinceLastTithe} />
      <Total label="Total income" amt={incomeTotal} />
      <Total label="Tithing owed" amt={tithingOwed} />
    </Chrome>
  )
}

export default function render(store, el) {
  renderWithState(connect(mapStateToProps)(Tithing), el)
}
