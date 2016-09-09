import { connect } from 'react-redux'
import React from 'react'

import Alerts from '../../alerts'
import Debug from '../components/debug'
import Header from '../components/header'
import Loading from '../components/loading'

function mapStateToProps(state) {
  return {
    isLoaded: state.acct.accts.length > 0 && state.cat.cats.length > 0
  }
}

function renderLoading() {
  return <Loading />
}

function renderApp(props) {
  return (
    <div>
      <Debug />
      <Header />
      {props.children}
      <Alerts />
    </div>
  )
}

function render(props) {
  return props.isLoaded
    ? renderApp(props)
    : renderLoading(props)
}

function Chrome(props) {
  return (
    <div>
      <Debug />
      {render(props)}
      <Alerts />
    </div>
  )
}

export default connect(mapStateToProps)(Chrome)
