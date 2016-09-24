import React from 'react'
import styleable from 'react-styleable'

import css from './title.css'

function Title(props) {
  return (
    <h2 className={props.css.root}>{props.children}</h2>
  )
}

export default styleable(css)(Title)
