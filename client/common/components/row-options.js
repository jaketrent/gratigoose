import React from 'react'
import styleable from 'react-styleable'

import css from './row-options.css'

const { func } = React.PropTypes

function RowOptions(props) {
  return (
    <div className={props.css.root}>
      <button className={props.css.option} onClick={props.onClick.bind(null, 'destroy')}>Destroy</button>
      <button className={props.css.option} onClick={props.onClick.bind(null, 'close')}>Close</button>
    </div>
  )
}
RowOptions.propTypes = {
  onClick: func.isRequired
}

 export default styleable(css)(RowOptions)
