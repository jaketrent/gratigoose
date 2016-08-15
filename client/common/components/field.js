import { findDOMNode } from 'react-dom'
import React from 'react'
import styleable from 'react-styleable'

import css from './field.css'
import FieldErrors from './field-errors'

const { arrayOf, bool, func, object, string, node } = React.PropTypes

class Field extends React.Component {
  static propTypes = {
    css: object,
    errors: arrayOf(object),
    isFocused: bool,
    isWithErrors: bool,
    label: string.isRequired,
    name: string.isRequired,
    onFieldChange: func.isRequired,
    type: string,
    value: node
  }
  static defaultProps = {
    isFocused: false,
    type: 'text',
    isWithErrors: true
  }
  componentDidMount() {
    if (this.props.isFocused)
      findDOMNode(this.refs.input).focus()
  }
  renderField() {
    return this.props.type === 'textarea'
      ? this.renderTextarea()
      : this.renderInput()
  }
  renderInput() {
    return (
      <input className={this.props.css.input}
             type={this.props.type}
             id={this.props.name}
             name={this.props.name}
             placeholder={this.props.label}
             value={this.props.value}
             onChange={this.props.onFieldChange}
             ref="input" />
    )
  }
  renderTextarea() {
    return (
      <textarea className={this.props.css.inputTextarea}
                id={this.props.name}
                name={this.props.name}
                placeholder={this.props.label}
                value={this.props.value}
                onChange={this.props.onFieldChange}
                ref="input" />
    )
  }
  renderErrors() {
    if (this.props.isWithErrors)
      return <FieldErrors name={this.props.name}
                          errors={this.props.errors} />
  }
  render() {
    return (
      <label htmlFor={this.props.name}
             className={this.props.css.field}>
        {this.renderErrors()}
        <span className={this.props.css.labelText}>
          {this.props.label}
        </span>
        {this.renderField()}
      </label>
    )
  }
}

export default styleable(css)(Field)
