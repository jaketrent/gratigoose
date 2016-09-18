import React from 'react'

const { arrayOf, func, object } = React.PropTypes

function renderOption(props, acct, i) {
  return (
    <li key={i} onClick={e => props.onSelect(e, acct)}>
      {acct.name}
    </li>
  )
}

function renderOptions(props) {
  return props.accts.map((a, i) => renderOption(props, a, i))
}

function AcctInput(props) {
  return (
    <ul>
      {renderOptions(props)}
    </ul>
  )
}

AcctInput.propTypes = {
  accts: arrayOf(object).isRequired,
  onSelect: func.isRequired
}

export default AcctInput
