import { connect } from 'react-redux'
import React from 'react'
import styleable from 'react-styleable'

import * as actions from './actions'
import css from '../common/components/input-form.css'
import Field from '../common/components/field'
import { formatUsd } from '../common/amt'
import * as utils from '../expected/utils'

const { func, number, object, shape, string } = React.PropTypes

const initialState = {
  amt: '' 
}

function mapDispatchToProps(dispatch) {
  return {
    createExpected(args) { dispatch(actions.createExpected(args)) },
    updateExpected(args) { dispatch(actions.updateExpected(args)) }
  }
}

class ExpectedInputForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    if (props.line.expected)
      this.state.amt = props.line.expected.amt

    this.handleAmtChange = this.handleAmtChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleAmtChange(evt) {
    this.setState({
      amt: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    if (this.state.amt) {
      const { line, month, year } = this.props
      const { amt } = this.state
      const { cat, expected } = line
      const { id } = expected

      if (id)
        this.props.updateExpected({ expected, amt })
      else
        this.props.createExpected({ amt, cat, year, month })

      if (typeof this.props.onSubmit === 'function')
        this.props.onSubmit(evt, expected)
    }
  }
  render() {
    return (
      <form className={this.props.css.root} onSubmit={this.handleSubmit}>
        <div className={this.props.css.fields}>
          <div className={this.props.css.fieldReadOnly}>{this.props.line.cat.name}</div>
          <Field css={{ field: this.props.css.field }}
                 errors={this.props.errors}
                 isFocused={true}
                 label="Amt"
                 name="amt"
                 onFieldChange={this.handleAmtChange}
                 value={this.state.amt} />
          <div className={this.props.css.fieldReadOnly}>{formatUsd(this.props.line.transsAmtSum)}</div>
          <div className={this.props.css.fieldReadOnly}>{formatUsd(this.props.line.diff)}</div>
        </div>
        <input className={this.props.css.btn} type="submit" value="Submit" />
      </form>
    )
  }
}
ExpectedInputForm.propTypes = {
  line: shape({
    id: number,
    cat: object,
    expected: object,
    transsAmtSum: number,
    diff: number
  }).isRequired,
  month: string.isRequired,
  onSubmit: func,
  year: string.isRequired
}

export default styleable(css)(connect(null, mapDispatchToProps)(ExpectedInputForm))
