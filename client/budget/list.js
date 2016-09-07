import React from 'react'
import styleable from 'react-styleable'

import css from './list.css'
import { formatBudgetLines } from './utils'

const { arrayOf, bool, number, object, shape, string } = React.PropTypes

function formatUsd(amt) {
  return amt.toLocaleString('en-US', { style: 'currency', currency: 'usd', minimumFractionDigits: 2 })
}

function Row(props) {
  return (
    <tr className={props.css.row}>
      <td className={props.css.cell}>
        {props.line.catName}
      </td>
      <td className={props.css.cell}>
        {formatUsd(props.line.expectedAmt)}
      </td>
      <td className={props.css.cell}>
        {formatUsd(props.line.transsAmtSum)}
      </td>
      <td className={props.css.cell}>
        {formatUsd(props.line.diff)}
      </td>
    </tr>
  )
}

Row.PropTypes = {
  line: shape({
    id: number,
    catName: string,
    expectedAmt: number,
    transsAmtSum: number,
    diff: number
  })
}

function renderRows(props, lines) {
  return lines.map(l =>
    <Row css={props.css}
         key={l.id}
         line={l} />
  )
}

function renderHeader(props) {
  return (
    <tr className={props.css.headRow}>
      <th className={props.css.headCell}>
        Cat
      </th>
      <th className={props.css.headCell}>
        Expected
      </th>
      <th className={props.css.headCell}>
        Actual
      </th>
      <th className={props.css.headCell}>
        Difference
      </th>
    </tr>
  )
}

function List(props) {
  return (
    <table className={props.css.root}>
      <thead className={props.css.head}>
        {renderHeader(props)}
      </thead>
      <tbody className={props.css.body}>
        {renderRows(props, formatBudgetLines(props))}
      </tbody>
    </table>
  )
}
List.PropTypes = {
  cats: arrayOf(object),
  expecteds: arrayOf(object),
  transs: arrayOf(object)
}

export default styleable(css)(List)
