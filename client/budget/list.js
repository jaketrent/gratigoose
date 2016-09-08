import React from 'react'
import styleable from 'react-styleable'

import css from './list.css'
import ExpectedInput from './expected-input'
import { formatBudgetLines, formatUsd } from './utils'

const { arrayOf, bool, func, number, object, shape, string } = React.PropTypes

function Row(props) {
  return (
    <tr className={props.css.row}>
      <td className={props.css.cell}>
        {props.line.catName}
      </td>
      <td className={props.css.cell}>
        <ExpectedInput catId={props.line.catId}
                       onSubmit={props.onExpectedSubmit} />
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
  onExpectedSubmit: func.isRequired,
  line: shape({
    catId: number,
    catName: string,
    expectedAmt: number,
    transsAmtSum: number,
    diff: number
  }).isRequired
}

function renderRows(props, lines) {
  return lines.map(l =>
    <Row css={props.css}
         key={l.catId}
         line={l}
         onExpectedSubmit={props.onExpectedSubmit}/>
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
  onExpectedSubmit: func.isRequired,
  transs: arrayOf(object)
}

export default styleable(css)(List)
