import React from 'react'
import styleable from 'react-styleable'

import { amtGtZero, amtLteZero, sumForCatType, sumWhereAmt } from '../common/amt'
import catTypes from '../cat/types'
import css from './summary.css'
import Diff from './diff'
import { formatBudgetLines } from './utils'
import { formatUsd } from '../common/amt'
import Net0 from './net-0'
import PlanVsActivityViz from './plan-vs-activity-viz'
import SectionTitle from '../common/components/section-title'

const { arrayOf, bool, number, object, shape, string } = React.PropTypes

function Row(props) {
  return (
    <tr className={props.css.row}>
      <td className={props.css.cell}>
        {props.label}
      </td>
      <td className={props.css.cell}>
        {formatUsd(props.amt)}
      </td>
    </tr>
  )
}

Row.PropTypes = {
  label: string,
  amt: number
}

function renderRow(props, label, amt) {
  return (
    <Row amt={amt}
         css={props.css}
         key={label}
         label={label} />
  )
}

function renderHeader(props) {
  return (
    <tr className={props.css.headRow}>
      <th className={props.css.headCell}>
      </th>
      <th className={props.css.headCell}>
        Amt
      </th>
    </tr>
  )
}

function Summary(props) {
  const expectedIncome = sumWhereAmt(props.expecteds, amtGtZero)
  const expectedDebits = sumWhereAmt(props.expecteds, amtLteZero)
  const expectedSavings = sumForCatType(catTypes.savings, props.expecteds)
  const expectedNet = expectedIncome - expectedDebits - expectedSavings
  const transIncome = sumWhereAmt(props.transs, amtGtZero)
  const transDebits = sumWhereAmt(props.transs, amtLteZero)
  const transSavings = sumForCatType(catTypes.savings, props.transs)
  const transNet = transIncome - transDebits - transSavings

  const planVsActivityVizData = [
    { x: 'Income', ys: [expectedIncome, transIncome] },
    { x: 'Debits', ys: [expectedDebits, transDebits] },
    { x: 'Savings', ys: [expectedSavings, transSavings] }
  ]

  const diffCss = { root: props.css.diffRoot }
  // TODO: include nets in some sort of balance viz
  return (
    <div className={props.css.root}>
      <SectionTitle>Plan</SectionTitle>
      <div className={props.css.row}></div>
      <div className={props.css.row}>
        <Net0 income={expectedIncome}
              debits={expectedDebits}
              savings={expectedSavings} />
      </div>

      <SectionTitle>Activity</SectionTitle>
      <div className={props.css.rowActivityViz}>
        <PlanVsActivityViz data={planVsActivityVizData} />
      </div>
      <div className={props.css.row}>
        <Diff actual={transIncome}
              css={diffCss}
              expected={expectedIncome}
              title="Income" />
        <Diff actual={transDebits}
              css={diffCss}
              expected={expectedDebits}
              title="Debits"/>
        <Diff actual={transSavings}
              css={diffCss}
              expected={expectedSavings}
              title="Savings" />
      </div>
    </div>
  )
}
Summary.PropTypes = {
  expecteds: arrayOf(object),
  transs: arrayOf(object)
}

export default styleable(css)(Summary)
