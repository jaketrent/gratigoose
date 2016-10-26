import MediaQuery from 'react-responsive'
import React from 'react'
import styleable from 'react-styleable'

import css from './list.css'
import { keyCodes } from '../events'
import media from '../styles/media'

const { arrayOf, bool, element, func, object } = React.PropTypes

class Row extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false
    }
    this.handleReadModeClick = this.handleReadModeClick.bind(this)
    this.handleReadKeyUp = this.handleReadKeyUp.bind(this)
    this.handleWriteModeSubmit = this.handleWriteModeSubmit.bind(this)
    this.renderReadCol = this.renderReadCol.bind(this)
  }
  handleReadModeClick() {
    this.setState({ isEditing: true })
  }
  handleReadKeyUp(evt) {
    if (evt.which === keyCodes.ENTER)
      this.setState({ isEditing: true })
  }
  handleWriteModeSubmit() {
    this.setState({ isEditing: false }, _ => {
      this.readRow.focus()
    })

    if (typeof this.props.onEditSubmit === 'function')
      this.props.onEditSubmit.apply(this, arguments)
  }
  renderWrite() {
    return (
      <div className={this.props.css.rowWrite}>
        <div className={this.props.css.cell}>
          {this.props.renderEdit({ ...this.props, onEditSubmit: this.handleWriteModeSubmit }, this.props.row)}
        </div>
      </div>
    )
  }
  renderReadCol(data, i) {
    return i > 2
      ? <MediaQuery key={i} query={media.smallWidth}>
          <div className={this.props.css.cell}>
            {data}
          </div>
        </MediaQuery>
      : <div className={this.props.css.cell} key={i}>
          {data}
        </div>
  }
  renderReadCols() {
    return this.props.renderData(this.props, this.props.row)
      .map(this.renderReadCol)
  }
  renderRead() {
    return (
      <div className={this.props.css.row}
          onClick={this.handleReadModeClick}
          onKeyUp={this.handleReadKeyUp}
          ref={el => this.readRow = el}
          tabIndex="0">
        {this.renderReadCols()}
      </div>
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
      <div className={props.css.rowEmpty}>
        <div className={props.css.cellEmpty}>
          <div>Empty</div>
        </div>
      </div>
    )
}

function renderHeaderCol(props, label, i) {
  return i > 2
    ? <MediaQuery key={i} query={media.smallWidth}>
        <div className={props.css.headCell}>
          {label}
        </div>
      </MediaQuery>
    : <div className={props.css.headCell} key={i}>
        {label}
      </div>
}

function renderHeaderCols(props) {
  if (hasRows(props))
    return <div className={props.css.headRow}>
      {props.renderHeaderData(props).map(renderHeaderCol.bind(this, props))}
    </div>
}

function List(props) {
  return (
    <div className={props.css.root}>
      <div className={props.css.head}>
        {renderHeaderCols(props)}
      </div>
      <div className={props.css.body}>
        {renderEmpty(props)}
        {renderRows(props)}
      </div>
    </div>
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
