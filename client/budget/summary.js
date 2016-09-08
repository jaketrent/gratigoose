import React from 'react'
import styleable from 'react-styleable'

import catTypes from '../cat/types'
import css from './summary.css'
import { amtGtZero, amtLteZero, formatBudgetLines, formatUsd, sumForCatType, sumWhereAmt } from './utils'

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
  return (
    <table className={props.css.root}>
      <thead className={props.css.head}>
        {renderHeader(props)}
      </thead>
      <tbody className={props.css.body}>
      {renderRow(props, 'Expected income', expectedIncome)}
      {renderRow(props, 'Expected debits', expectedDebits)}
      {renderRow(props, 'Expected savings', expectedSavings)}
      {renderRow(props, 'Net expectations', expectedNet)}
      {renderRow(props, 'Sum income', transIncome)}
      {renderRow(props, 'Sum debits', transDebits)}
      {renderRow(props, 'Sum savings', transSavings)}
      {renderRow(props, 'Net income', transNet)}
      </tbody>
    </table>
  )
}
Summary.PropTypes = {
  expecteds: arrayOf(object),
  transs: arrayOf(object)
}

export default styleable(css)(Summary)
