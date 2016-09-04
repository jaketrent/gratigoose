import MediaQuery from 'react-responsive'
import React from 'react'
import styleable from 'react-styleable'

import css from './list.css'
import media from '../common/styles/media'

const { arrayOf, bool, object } = React.PropTypes

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return `${year}-${month + 1}-${day}`
}

function Row(props) {
  return (
    <tr className={props.css.row}>
      <td className={props.css.cell}>
        {formatDate(props.trans.date)}
      </td>
      <td className={props.css.cell}>
        {props.trans.desc}
      </td>
      <td className={props.css.cell}>
        {props.trans.amt}
      </td>
      <MediaQuery query={media.smallWidth}>
        <td className={props.css.cell}>
          {props.trans.acct.abbrev}
        </td>
      </MediaQuery>
      <MediaQuery query={media.smallWidth}>
        <td className={props.css.cell}>
          {props.trans.cat.abbrev}
        </td>
      </MediaQuery>
    </tr>
  )
}

Row.PropTypes = {
  trans: object
}

function renderRows(props) {
  return props.transs.map(t =>
    <Row css={props.css}
         key={t.id}
         trans={t} />
  )
}

function renderHeader(props) {
  return (
    <tr className={props.css.headRow}>
      <th className={props.css.headCell}>
        Date
      </th>
      <th className={props.css.headCell}>
        Desc
      </th>
      <th className={props.css.headCell}>
        Amt
      </th>
      <MediaQuery query={media.smallWidth}>
        <th className={props.css.headCell}>
          Acct
        </th>
      </MediaQuery>
      <MediaQuery query={media.smallWidth}>
        <th className={props.css.headCell}>
          Cat
        </th>
      </MediaQuery>
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
        {renderRows(props)}
      </tbody>
    </table>
  )
}
List.PropTypes = {
  transs: arrayOf(object)
}

export default styleable(css)(List)
