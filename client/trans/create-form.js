import { connect } from 'react-redux'
import React from 'react'

import * as actions from './actions'
import Field from '../common/components/field'
import renderWithState from '../common/store/render'

function mapStateToProps(state) {
  return {
    createTrans: state.trans.createTrans
  }
}

function mapDispatchToProps(dispatch) {
  return {
    create(trans) { dispatch(actions.create(trans)) },
    setCreateTransField(name, value) {
      dispatch(actions.setCreateTransField({ name, value }))
    }
  }
}

class CreateForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(evt) {
    this.props.setCreateTransField(evt.target.name, evt.target.value)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.create(this.props.createTrans)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Field errors={this.props.errors}
               label="Name"
               name="name"
               onFieldChange={this.handleChange}
               value={this.props.createTrans.name} />
        <input type="submit" value="Create" />
      </form>
    )
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(CreateForm)
