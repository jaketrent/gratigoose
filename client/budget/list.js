import React from 'react'

import * as dateUtils from '../common/date'
import ExpectedInputForm from './expected-input-form'
import { formatBudgetLines } from './utils'
import { formatUsd } from '../common/amt'
import List from '../common/components/list'

const { arrayOf, bool, func, number, object, shape, string } = React.PropTypes

function renderEdit(props, row) {
  return (
    <ExpectedInputForm cat={row.cat}
                       expected={row.expected}
                       month={props.month}
                       onSubmit={props.onEditSubmit.bind(null, row.cat)}
                       year={props.year} />
  )
}

function renderHeaderData(props) {
  return ['Category', 'Expected', 'Actual', 'Difference']
}

function renderRowData(props, row) {
  return [
    row.cat.name,
    row.expected
      ? formatUsd(row.expected.amt)
      : formatUsd(0),
    formatUsd(row.transsAmtSum),
    formatUsd(row.diff)
  ]
}

function BudgetCatList(props) {
  return (
    <List month={props.month}
          onEditSubmit={props.onEditSubmit}
          renderEdit={renderEdit}
          renderHeaderData={renderHeaderData}
          renderRowData={renderRowData}
          rows={formatBudgetLines(props)}
          year={props.year} />
  )
}
BudgetCatList.PropTypes = {
  cats: arrayOf(object).isRequired,
  expecteds: arrayOf(object).isRequired,
  month: string.isRequired,
  onEditSubmit: func,
  transs: arrayOf(object).isRequired,
  year: string.isRequired
}

export default BudgetCatList 
