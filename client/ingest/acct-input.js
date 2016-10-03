import React from 'react'
import styleable from 'react-styleable'

import css from './acct-input.css'

const { arrayOf, func, object } = React.PropTypes

function renderOption(props, acct, i) {
  return (
    <li className={props.css.item}
        key={i}
        onClick={e => props.onSelect(e, acct)}>
      {acct.name}
    </li>
  )
}

function renderOptions(props) {
  return props.accts.map((a, i) => renderOption(props, a, i))
}

function AcctInput(props) {
  return (
    <ul className={props.css.root}>
      {renderOptions(props)}
    </ul>
  )
}

AcctInput.propTypes = {
  accts: arrayOf(object).isRequired,
  onSelect: func.isRequired
}

export default styleable(css)(AcctInput)
