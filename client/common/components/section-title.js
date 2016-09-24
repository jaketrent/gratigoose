import React from 'react'
import styleable from 'react-styleable'

import css from './section-title.css'

function SectionTitle(props) {
  return (
    <h3 className={props.css.root}>{props.children}</h3>
  )
}

export default styleable(css)(SectionTitle)
