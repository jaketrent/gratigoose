import React from 'react'
import styleable from 'react-styleable'

import css from './field-errors.css'
import * as errorsUtils from '../errors'

const { string, arrayOf, shape } = React.PropTypes

function renderError(props, error, i) {
  return (
    <li key={i} className={props.css.error}>
      {error.detail}
    </li>
  )
}

function renderErrors(props) {
  if (errorsUtils.existFor(props.name, props.errors))
    return (
      <ul className={props.css.errors}>
        {props.errors
          .filter(errorsUtils.isFor.bind(null, props.name))
          .map(renderError.bind(null, props))}
      </ul>
    )
}

function FieldErrors(props) {
  return (
    <div className={props.css.container}>
      {renderErrors(props)}
    </div>
  )
}

FieldErrors.propTypes = {
  name: string.isRequired,
  errors: arrayOf(shape({
    field: string,
    detail: string
  }))
}
FieldErrors.defaultProps = {
  errors: []
}

export default styleable(css)(FieldErrors)
