import React from 'react'
import styleable from 'react-styleable'

import css from './loading.css'

function Loading(props) {
  return (
    <div className={props.css.root}>Loading...</div>
  )
}

export default styleable(css)(Loading)
