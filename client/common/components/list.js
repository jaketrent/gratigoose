import MediaQuery from 'react-responsive'
import React from 'react'
import styleable from 'react-styleable'

import css from './list.css'
import media from '../styles/media'

const { arrayOf, bool, element, func, object } = React.PropTypes

class Row extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false
    }
    this.handleReadModeClick = this.handleReadModeClick.bind(this)
    this.handleWriteModeSubmit = this.handleWriteModeSubmit.bind(this)
    this.renderReadCol = this.renderReadCol.bind(this)
  }
  handleReadModeClick() {
    this.setState({ isEditing: true })
  }
  handleWriteModeSubmit() {
    this.setState({ isEditing: false })

    if (typeof this.props.onEditSubmit === 'function')
      this.props.onEditSubmit.apply(this, arguments)
  }
  renderWrite() {
    return (
      <tr className={this.props.css.rowWrite}>
        <td className={this.props.css.cell}>
          {this.props.renderEdit({ ...this.props, onEditSubmit: this.handleWriteModeSubmit }, this.props.row)}
        </td>
      </tr>
    )
  }
  renderReadCol(data, i) {
    return i > 2
      ? <MediaQuery key={i} query={media.smallWidth}>
          <td className={this.props.css.cell}>
            {data}
          </td>
        </MediaQuery>
      : <td className={this.props.css.cell} key={i}>
          {data}
        </td>
  }
  renderReadCols() {
    return this.props.renderData(this.props, this.props.row)
      .map(this.renderReadCol)
  }
  renderRead() {
    return (
      <tr className={this.props.css.row}
          onClick={this.handleReadModeClick}>
        {this.renderReadCols()}
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
  renderEdit: func,
  renderData: func,
  row: object
}

function hasRows(props) {
  return Array.isArray(props.rows) && props.rows.length > 0
}

function renderRows(props) {
  return props.rows.map(r =>
    <Row {...props}
         css={props.css}
         key={r.id}
         renderEdit={props.renderEdit}
         renderData={props.renderRowData}
         row={r} />
  )
}

function renderEmpty(props) {
  if (!hasRows(props))
    return (
      <tr className={props.css.rowEmpty}>
        <td className={props.css.cellEmpty}>
          <div>Empty</div>
        </td>
      </tr>
    )
}

function renderHeaderCol(props, label, i) {
  return i > 2
    ? <MediaQuery key={i} query={media.smallWidth}>
        <th className={props.css.headCell}>
          {label}
        </th>
      </MediaQuery>
    : <th className={props.css.headCell} key={i}>
        {label}
      </th>
}

function renderHeaderCols(props) {
  if (hasRows(props))
    <tr className={props.css.headRow}>
      {props.renderHeaderData(props).map(renderHeaderCol.bind(this, props))}
    </tr>
}

function List(props) {
  console.log('list props', props)
  return (
    <table className={props.css.root}>
      <thead className={props.css.head}>
        {renderHeaderCols(props)}
      </thead>
      <tbody className={props.css.body}>
        {renderEmpty(props)}
        {renderRows(props)}
      </tbody>
    </table>
  )
}
List.PropTypes = {
  onEditSubmit: func.isRequired,
  renderEdit: func.isRequired,
  renderHeaderData: func.isRequired,
  renderRowData: func.isRequired,
  rows: arrayOf(object)
}

export default styleable(css)(List)
