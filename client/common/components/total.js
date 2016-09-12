import React from 'react'

import { formatUsd } from '../amt'

const { number, string } = React.PropTypes

export default function Total(props) {
  return (
    <div>
      {props.label}: {formatUsd(props.amt)}
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
