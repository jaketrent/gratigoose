import { connect } from 'react-redux'
import React from 'react'
import styleable from 'react-styleable'

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

function renderAlert(props, alert) {
  return (
    <li className={props.css[alert.level]}
        key={alert.id}
        onClick={_ => props.dismissAlert(alert.id)}>
      {alert.title}
    </li>
  )
}

function renderAlerts(props) {
  return props.alerts.map(alert => renderAlert(props, alert))
}

function Alerts(props) {
  return (
    <ul className={props.css.root}>
      {renderAlerts(props)}
    </ul>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(styleable(css)(Alerts))
