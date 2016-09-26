import React from 'react'
import styleable from 'react-styleable'

import css from './net-0.css'
import { formatUsd } from '../common/amt'

const { number } = React.PropTypes

function Net0(props) {
  const net0 = props.income + props.debits + props.savings
  return (
    <div className={props.css.root}>
      <div className={props.css.part}>
        <div className={props.css.label}>Income</div>
        <div className={props.css.value}>{formatUsd(props.income)}</div>
      </div>
      <div className={props.css.part}>
        <div className={props.css.label}>Debits</div>
        <div className={props.css.value}>
          {props.debits > 0 ? '+' : ''}
          {formatUsd(props.debits)}
        </div>
      </div>
      <div className={props.css.part}>
        <div className={props.css.label}>Savings</div>
        <div className={props.css.value}>
          {props.savings > 0 ? '+' : ''}
          {formatUsd(props.savings)}
        </div>
      </div>
      <div className={props.css.part}>
        <div className={props.css.label}>&nbsp;</div>
        <div className={props.css.valueNet}>
          = {formatUsd(net0)}
        </div>
      </div>
    </div>
  )
}

Net0.propTypes = {
  income: number.isRequired,
  debits: number.isRequired,
  savings: number.isRequired
}

export default styleable(css)(Net0)
