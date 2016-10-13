import React from 'react'
import styleable from 'react-styleable'

import css from './autocomplete-field.css'
import FieldErrors from './field-errors'

const { any, arrayOf, bool, func, node, number, object, oneOfType, shape, string } = React.PropTypes

const ARROW_UP = 38
const ARROW_DOWN = 40

class AutocompleteField extends React.Component {
  static propTypes = {
    completions: arrayOf(shape({
      value: any,
      label: node
    })),
    css: object,
    errors: arrayOf(object),
    isFocused: bool,
    isSelected: bool,
    isWithErrors: bool,
    label: string.isRequired,
    name: string.isRequired,
    onFieldChange: func.isRequired,
    onFieldKeyUp: func,
    onSelect: func.isRequired,
    value: any // TODO: handle null... oneOfType([string, number])
  };
  static defaultProps = {
    isFocused: false,
    isSelected: false,
    isWithErrors: true
  };
  constructor() {
    super() 
    this.state = { isOpen: false, focusIndex: -1 }
    this.handleArrows = this.handleArrows.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.renderCompletion = this.renderCompletion.bind(this)
  }
  componentDidMount() {
    if (this.shouldFocusInput(this.input))
      this.input.focus()

    if (this.props.isSelected)
      this.input.setSelectionRange(0, this.input.value.length)
  }
  handleFieldChange(evt) {
    this.setState({ isOpen: true })
    this.props.onFieldChange(evt)
  }
  handleSelect(evt, val) {
    this.setState({
      focusIndex: -1,
      isOpen: false
    })
    this.props.onSelect(evt, val)
    this.input.focus()
  }
  handleArrows(evt) {
    if (!(Array.isArray(this.props.completions) && this.props.completions.length > 0))
      return

    if (evt.which === ARROW_DOWN)
      this.moveFocusIndex(1)
    else if (evt.which === ARROW_UP)
      this.moveFocusIndex(-1)
  }
  moveFocusIndex(delta) {
    let index = this.state.focusIndex + delta
    if (index >= this.props.completions.length)
      index = this.props.completions.length - 1
    else if (index < 0)
      index = 0

    this.setState({ focusIndex: index })
  }
  shouldFocusInput(el) {
    return el && (
      (this.state.isOpen
       && Array.isArray(this.props.completions)
       && this.props.completions.length > 0)
      || this.props.isFocused
    )
  }
  renderCompletions() {
    if (this.state.isOpen && Array.isArray(this.props.completions) && this.props.completions.length > 0)
      return (
        <div className={this.props.css.dropdown}>
          {this.props.completions.map(this.renderCompletion)}
        </div>
      )
  }
  renderCompletion(completion, i) {
    return (
      <button className={this.props.css.dropdownItem}
              key={completion.value}
              onClick={evt => this.handleSelect(evt, completion.value)}
              ref={el => i === this.state.focusIndex && el ? el.focus() : null}>
        {completion.label}
      </button>
    )
  }
  renderInput() {
    return (
      <input autoComplete="off"
             className={this.props.css.input}
             type="text"
             id={this.props.name}
             name={this.props.name}
             placeholder={this.props.label}
             value={this.props.value}
             onChange={this.handleFieldChange}
             onKeyUp={this.props.onKeyUp}
             ref={el => this.input = el} />
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
        <div className={this.props.css.dropdownContainer}
             onKeyUp={this.handleArrows}>
          {this.renderInput()}
          {this.renderCompletions()}
        </div>
      </label>
    )
  }
}

export default styleable(css)(AutocompleteField)
