import React from 'react'

import InputForm from './input-form'
import * as dateUtils from '../common/date'
import { formatUsd } from '../common/amt'
import List from '../common/components/list'

const { arrayOf, func, object } = React.PropTypes

function renderEdit(props, row) {
  return (
    <InputForm onSubmit={props.onEditSubmit}
               submitAction="update"
               trans={row} />
  )
}

function renderHeaderData(props) {
  return ['Date', 'Desc', 'Amt', 'Acct', 'Cat']
}

function renderRowData(props, row) {
  return [
    dateUtils.format(row.date),
    row.desc,
    formatUsd(row.amt),
    row.acct.abbrev,
    row.cat.abbrev
  ]
}

function TransList(props) {
  return (
    <List onEditSubmit={props.onEditSubmit}
          renderEdit={renderEdit}
          renderHeaderData={renderHeaderData}
          renderRowData={renderRowData}
          rows={props.transs} />
  )
}

TransList.PropTypes = {
  onEditSubmit: func,
  transs: arrayOf(object).isRequired
}

export default TransList 
