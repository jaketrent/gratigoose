import React from 'react'
import styleable from 'react-styleable'

import css from './csv-input.css'

const { func } = React.PropTypes

class CsvInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
  }
  componentDidMount() {
    this.file.click()
  }
  handleChange(evt) {
    const file = evt.target.files[0]
    this.props.onSelect(evt, file)

    const reader = new FileReader()
    reader.onload = e => {
      this.props.onLoad(reader.result)
    }
    reader.readAsText(file, 'utf8')
  }
  handleBtnClick() {
    this.file.click()
  }
  render() {
    return (
      <label className={this.props.css.root}>
        <span className={this.props.css.label}>Find CSV</span>
        <button className={this.props.css.btn}
                onClick={this.handleBtnClick}>Find file</button>
        <input className={this.props.css.file}
               onChange={this.handleChange}
               ref={el => this.file = el}
               type="file" />
      </label>
    )
  }
}

CsvInput.propTypes = {
  onLoad: func.isRequired,
  onSelect: func.isRequired
}

export default styleable(css)(CsvInput)
