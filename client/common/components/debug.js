import React from 'react'
import styleable from 'react-styleable'

import css from './debug.css'

function Debug(props) {
  return (
    <div className={props.css.root}>
      <div>
        w: {window.innerWidth} h: {window.innerHeight}
      </div>
    </div>
  )
}

export default styleable(css)(Debug)
