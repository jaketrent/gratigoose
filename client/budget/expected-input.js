import React from 'react'

import { formatUsd } from '../common/amt'

const { func, number, object } = React.PropTypes

const ENTER = 13

export default class ExpectedInput extends React.Component {
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleReadKeyUp = this.handleReadKeyUp.bind(this)
    this.handleWriteKeyUp = this.handleWriteKeyUp.bind(this)
  }
  handleOpen() {
    this.setState({ isOpen: true })
  }
  handleWriteKeyUp(evt) {
    if (evt.which === ENTER) {
      this.props.onSubmit(evt, this.props.cat, this.props.expected)
      this.setState({ isOpen: false })
    }
  }
  handleReadKeyUp(evt) {
    if (evt.which === ENTER)
      this.handleOpen()
  }
  renderWrite() {
    return (
      <div>
        <input onKeyUp={this.handleWriteKeyUp}
               ref={el => el ? el.focus() : null}
               type="text"
               defaultValue={this.props.expected && this.props.expected.amt}/>
      </div>
    )
  }
  renderRead() {
    return (
      <div onKeyUp={this.handleReadKeyUp} onClick={this.handleOpen} tabIndex={0}>
        {formatUsd(this.props.expected && this.props.expected.amt)}
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.state.isOpen ? this.renderWrite() : this.renderRead()}
      </div>
    )
  }
}
ExpectedInput.propTypes = {
  cat: object.isRequired,
  expected: object,
  onSubmit: func.isRequired
}
