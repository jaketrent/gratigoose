import React from 'react'
import styleable from 'react-styleable'

import css from './total.css'
import { formatUsd } from '../amt'

const { number, string } = React.PropTypes

function Total(props) {
  return (
    <div className={props.css.root}>
      <span className={props.css.label}>{props.label}:</span> <span className={props.css.amt}>{formatUsd(props.amt)}</span>
    </div>
  )
}

Total.propTypes = {
  label: string,
  amt: number
}

Total.defaultProps = {
  label: 'Total',
  amt: 0
}

export default styleable(css)(Total)
