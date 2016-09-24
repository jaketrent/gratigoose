import React from 'react'

import CreateForm from './create-form'
import * as dateUtils from '../common/date'
import { formatUsd } from '../common/amt'
import List from '../common/components/list'

const { arrayOf, object } = React.PropTypes

function renderEdit(props, row) {
  return (
      <CreateForm onSubmit={props.onSubmit}
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
    <List renderEdit={renderEdit}
          renderHeaderData={renderHeaderData}
          renderRowData={renderRowData}
          rows={props.transs} />
  )
}
TransList.PropTypes = {
  transs: arrayOf(object)
}

export default TransList 
