import FocusTrap from 'focus-trap-react'
import MediaQuery from 'react-responsive'
import React from 'react'
import styleable from 'react-styleable'

import css from './list.css'
import { keyCodes } from '../events'
import media from '../styles/media'
import RowOptions from './row-options'

const { arrayOf, bool, element, func, object } = React.PropTypes

const MOUSE_DOWN_TIME_ELAPSED_TRIGGER = 500

let mouseDownTimeStart = 0

class Row extends React.Component {
  constructor() {
    super()
    this.state = {
      // activeTrap: false,
      isEditing: false
    }
    this.handleOptionClick = this.handleOptionClick.bind(this)
    this.handleReadKeyUp = this.handleReadKeyUp.bind(this)
    this.handleReadModeMouseDown = this.handleReadModeMouseDown.bind(this)
    this.handleReadModeMouseUp = this.handleReadModeMouseUp.bind(this)
    this.handleWriteModeSubmit = this.handleWriteModeSubmit.bind(this)
    this.renderReadCol = this.renderReadCol.bind(this)
  }
  componentWillUnmount() {
    clearTimeout(this.mouseDownTimer)
  }
  // mountTrap() {
  //   this.setState({ activeTrap: true })
  // }
  // unmountTrap() {
  //   this.setState({ activeTrap: false })
  // }
  handleOptionClick(optionName, evt) {
    if (optionName === 'close')
      this.setState({ isOptioning: false })

    if (typeof this.props.onOptionClick === 'function')
      this.props.onOptionClick(optionName, this.props.row)
  }
  handleReadModeMouseDown() {
    if (this.state.isOptioning) return

    clearTimeout(this.mouseDownTimer)
    this.mouseDownTimer = setTimeout(_ => {
      this.setState({
        isOptioning: true
      })
    }, MOUSE_DOWN_TIME_ELAPSED_TRIGGER)
  }
  handleReadModeMouseUp() {
    if (this.state.isOptioning) return

    const mouseUpTime = new Date().getTime()
    const isMouseHold = (mouseUpTime - mouseDownTimeStart) >= MOUSE_DOWN_TIME_ELAPSED_TRIGGER
    if (!isMouseHold) {
      clearTimeout(this.mouseDownTimer)
      this.setState({ isEditing: true })
    }
  }
  handleReadKeyUp(evt) {
    if (this.state.isOptioning) return

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
      <FocusTrap focusTrapOptions={{
        escapeDeactivates: false,
        onDeactivate: this.unmountTrap
      }}>
        <div className={this.props.css.rowWrite}>
          <div className={this.props.css.cell}>
            {this.props.renderEdit({ ...this.props, onEditSubmit: this.handleWriteModeSubmit }, this.props.row)}
          </div>
        </div>
      </FocusTrap>
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
  renderRead(options) {
    return (
      <div className={this.props.css.row}
           onKeyUp={this.handleReadKeyUp}
           onMouseDown={this.handleReadModeMouseDown}
           onMouseUp={this.handleReadModeMouseUp} 
           ref={el => this.readRow = el}
           tabIndex="0">
        <div className={this.props.css.cols}>
          {this.renderReadCols()}
        </div>
        {options}
      </div>
    )
  }
  renderOptions() {
    return (
      <RowOptions onClick={this.handleOptionClick} />
    )
  }
  render() {
    return this.state.isEditing
      ? this.renderWrite()
      : this.renderRead(this.state.isOptioning ? this.renderOptions() : null)
  }
}

Row.PropTypes = {
  onOptionClick: func,
  renderEdit: func.isRequired,
  renderData: func.isRequired,
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
      <div className={props.css.cols}>
        {props.renderHeaderData(props).map(renderHeaderCol.bind(this, props))}
      </div>
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
  onOptionClick: func.isRequired,
  renderEdit: func.isRequired,
  renderHeaderData: func.isRequired,
  renderRowData: func.isRequired,
  rows: arrayOf(object)
}

export default styleable(css)(List)
