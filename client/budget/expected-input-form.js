import { connect } from 'react-redux'
import React from 'react'
import styleable from 'react-styleable'

import * as actions from './actions'
import css from '../common/components/input-form.css'
import Field from '../common/components/field'
import * as utils from '../expected/utils'

const { func, number, object, string } = React.PropTypes

const initialState = {
  expected: {
    amt: ''
  }
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
    if (props.expected)
      this.state.expected = props.expected

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleFieldChange(evt) {
    this.setState({
      expected: {
        ...this.state.expected,
        [evt.target.name]: evt.target.value
      }
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    if (this.state.expected.amt) {
      const { cat, month, year } = this.props
      const { expected } = this.state
      const { amt, id } = expected

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
          <Field css={{ field: this.props.css.field }}
                 errors={this.props.errors}
                 isFocused={true}
                 label="Amt"
                 name="amt"
                 onFieldChange={this.handleFieldChange}
                 value={this.state.expected.amt} />
        </div>
        <input className={this.props.css.btn} type="submit" value="Submit" />
      </form>
    )
  }
}
ExpectedInputForm.propTypes = {
  cat: object.isRequired,
  expected: object,
  month: string.isRequired,
  onSubmit: func,
  year: string.isRequired
}

export default styleable(css)(connect(null, mapDispatchToProps)(ExpectedInputForm))
