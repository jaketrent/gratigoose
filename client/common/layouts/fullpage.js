import React from 'react'
import styleable from 'react-styleable'

import Alerts from '../../alerts'
import css from './fullpage.css'
import Debug from '../components/debug'

function Fullpage(props) {
  return (
    <div className={props.css.root}>
      <Debug />
      {props.children}
      <Alerts />
    </div>
  )
}

export default styleable(css)(Fullpage)
