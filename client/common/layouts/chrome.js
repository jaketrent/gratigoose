import React from 'react'

import Alerts from '../../alerts'
import Debug from '../components/debug'
import Header from '../components/header'

export default function Chrome(props) {
  return (
    <div>
      <Debug />
      <Header />
      {props.children}
      <Alerts />
    </div>
  )
}
