import MediaQuery from 'react-responsive'
import React from 'react'
import styleable from 'react-styleable'

import CreateForm from './create-form'
import css from './list.css'
import * as dateUtils from '../common/date'
import { formatUsd } from '../common/amt'
import media from '../common/styles/media'

const { arrayOf, bool, object } = React.PropTypes

class Row extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false
    }
    this.handleReadModeClick = this.handleReadModeClick.bind(this)
    this.handleWriteModeSubmit = this.handleWriteModeSubmit.bind(this)
  }
  handleReadModeClick() {
    this.setState({ isEditing: true })
  }
  handleWriteModeSubmit() {
    this.setState({ isEditing: false })
  }
  renderWrite() {
    return (
      <tr className={this.props.css.row}>
        <td className={this.props.css.cell}>
        <CreateForm onSubmit={this.handleWriteModeSubmit}
                    submitAction="update"
                    trans={this.props.trans} />
        </td>
      </tr>
    )
  }
  renderRead() {
    return (
      <tr className={this.props.css.row}
          onClick={this.handleReadModeClick}>
        <td className={this.props.css.cell}>
          {dateUtils.format(this.props.trans.date)}
        </td>
        <td className={this.props.css.cell}>
          {this.props.trans.desc}
        </td>
        <td className={this.props.css.cell}>
          {formatUsd(this.props.trans.amt)}
        </td>
        <MediaQuery query={media.smallWidth}>
          <td className={this.props.css.cell}>
            {this.props.trans.acct.abbrev}
          </td>
        </MediaQuery>
        <MediaQuery query={media.smallWidth}>
          <td className={this.props.css.cell}>
            {this.props.trans.cat.abbrev}
          </td>
        </MediaQuery>
      </tr>
    )
  }
  render() {
    return this.state.isEditing
      ? this.renderWrite()
      : this.renderRead()
  }
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
