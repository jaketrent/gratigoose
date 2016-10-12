import { connect } from 'react-redux'
import React from 'react'
import styleable from 'react-styleable'
import { TransitionMotion, spring } from 'react-motion'

import css from './index.css'
import * as actions from './actions'

function mapStateToProps(state) {
  return {
    alerts: state.alerts.alerts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dismissAlert(errId) { dispatch(actions.dismissAlert(errId)) }
  }
}

class Alerts extends React.Component {
  constructor(props) {
    super(props)
    this.willLeave = this.willLeave.bind(this)
  }
  willLeave() {
    return {
      right: spring(-300)
    }
  }
  getDefaultStyles() {
    return this.props.alerts.map(alert => ({
      key: alert.id,
      data: alert.id,
      style: {
        right: 0
      }
    }))
  }
  getAlertStyles() {
    return this.props.alerts.map(alert => ({
      key: alert.id,
      data: alert,
      style: {
        right: spring(0)
      }
    }))
  }
  renderAlert(config) {
    const { data: alert } = config
    return (
      <li className={this.props.css[alert.level]}
          key={alert.id}
          onClick={_ => this.props.dismissAlert(alert.id)}
          style={config.style}>
        {alert.title}
      </li>
    )
  }
  render() {
    return (
      <TransitionMotion defaultStyles={this.getDefaultStyles()}
                        willLeave={this.willLeave}
                        styles={this.getAlertStyles()}>
        {interpolatedStyles =>
          <ul className={this.props.css.root}>
            {interpolatedStyles.map(config => {
              return this.renderAlert(config)
            })}
          </ul>
        }
      </TransitionMotion>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(styleable(css)(Alerts))
