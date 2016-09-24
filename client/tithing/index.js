import { connect } from 'react-redux'
import React from 'react'

import * as amtUtils from '../common/amt'
import Chrome from '../common/layouts/chrome'
import List from '../trans/list'
import renderWithState from '../common/store/render'
import SectionTitle from '../common/components/section-title'
import Total from '../common/components/total'
import Title from '../common/components/title'
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
  const transsSinceLastTithe = props.transs
    .filter(transUtils.sinceDate.bind(null, lastTithe ? lastTithe.date : null))
    .filter(amtUtils.amtGtZero)
  const excludedSinceLastTithe = transsSinceLastTithe
    .filter(utils.isExcludedFromTithing)
  const excludedTotal = amtUtils.sumWhereAmt(excludedSinceLastTithe)
  const incomeSinceLastTithe = transsSinceLastTithe
    .filter(t => !utils.isExcludedFromTithing(t))
  const incomeTotal = amtUtils.sumWhereAmt(incomeSinceLastTithe)
  const tithingOwed = incomeTotal / 10

  return (
    <Chrome title={<Title>Tithing</Title>}>
      <SectionTitle>Last Tithe</SectionTitle>
      <List transs={lastTithe ? [lastTithe] : []} />

      <SectionTitle>Excluded from tithing</SectionTitle>
      <List transs={excludedSinceLastTithe} />
      <Total label="Total excluded" amt={excludedTotal} />

      <SectionTitle>Income since last tithing</SectionTitle>
      <List transs={incomeSinceLastTithe} />
      <Total label="Total income" amt={incomeTotal} />
      <Total label="Tithing owed" amt={tithingOwed} />
    </Chrome>
  )
}

export default function render(store, el) {
  renderWithState(connect(mapStateToProps)(Tithing), el)
}
