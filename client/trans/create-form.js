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
    setCreateTransField(name, value) {
      dispatch(actions.setCreateTransField({ name, value }))
    }
  }
}

class CreateForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(evt) {
    this.props.setCreateTransField(evt.target.name, evt.target.value)
  }
  render() {
    return (
      <form onChange={this.handleChange}>
        <Field errors={this.props.errors}
               label="Name"
               name="name"
               onFieldChange={this.handleChange}
               value={this.props.createTrans.name} />
      </form>
    )
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(CreateForm)
