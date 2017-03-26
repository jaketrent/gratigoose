import { connect } from 'react-redux'
import React from 'react'
import styleable from 'react-styleable'

import * as actions from './actions'
import Field from '../common/components/field'
import Fullpage from '../common/layouts/fullpage'
import css from './login.css'
import renderWithState from '../common/store/render'
import * as router from '../common/router'
import Title from '../common/components/title'

const { func } = React.PropTypes

function mapStateToProps(state) {
  return {
    session: state.auth.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login(username, password) { dispatch(actions.login(username, password)) }
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.onSubmit(this.state.username, this.state.password)
  }
  handleFieldChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  render() {
    return (
      <div className={this.props.css.root}>
        <h1 className={this.props.css.img}>Gratigoose</h1>
        <form onSubmit={this.handleSubmit}>
          <Field 
            isFocused={true}
            label="Username"
            onFieldChange={this.handleFieldChange}
            name="username"
            value={this.state.username} />
          <Field
            label="Password"
            onFieldChange={this.handleFieldChange}
            name="password"
            type="password"
            value={this.state.password} />
          <button className={this.props.css.btn}>Login</button>
        </form>
      </div>
    )
  }
}
LoginForm.propTypes = {
  onSubmit: func.isRequired
}

const StyledLoginForm = styleable(css)(LoginForm)

class Login extends React.Component {
  componentWillMount() {
    if (this.props.session)
      router.redirect('/')
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.session)
      router.redirect('/')
  }
  render() {
    return (
      <Fullpage>
        <StyledLoginForm onSubmit={this.props.login} />
      </Fullpage>
    )
  }
}

export default function render(store, el) {
  renderWithState(connect(mapStateToProps, mapDispatchToProps)(Login), el)
}
