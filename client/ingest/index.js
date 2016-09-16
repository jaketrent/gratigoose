import React from 'react'

import Chrome from '../common/layouts/chrome'
import CsvAligner from './csv-aligner'
import CsvInput from './csv-input'
import renderWithState from '../common/store/render'

const colNames = [
  'date',
  'amt',
  'desc'
]

function formatRows(content) {
  return content
    .split('\n')
    .map(row => row.split(','))
}

class Ingest extends React.Component {
  constructor(props) {
    super()
    this.state = {
      contents: null,
      file: null
    }
    this.handleFileLoad = this.handleFileLoad.bind(this)
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }
  handleFileLoad(contents) {
    this.setState({ contents })
  }
  handleFileSelect(file) {
    this.setState({ file })
  }
  renderInput() {
    return this.state.contents
      ? null
      : <CsvInput onLoad={this.handleFileLoad} onSelect={this.handleFileSelect} />
  }
  renderTable() {
    return this.state.contents
      ? <CsvAligner columns={colNames} rows={formatRows(this.state.contents)}/>
      : null
  }
  render() {
    return (
      <Chrome loadTransMeta={false}>
        <h1>Ingest</h1>
        {this.renderInput()}
        {this.renderTable()}
      </Chrome>
    )
  }
}

export default function render(store, el) {
  renderWithState(Ingest, el)
}
