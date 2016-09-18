import { connect } from 'react-redux'
import React from 'react'

import AcctInput from './acct-input'
import * as actions from './actions'
import Chrome from '../common/layouts/chrome'
import CsvAligner from './csv-aligner'
import CsvInput from './csv-input'
import renderWithState from '../common/store/render'
import * as router from '../common/router'
import * as utils from './utils'

function formatRows(content) {
  return content
    .split('\n')
    .map(row => row.split(','))
    .filter(row => row.filter(cell => cell).length > 1)
}

function mapStateToProps(state) {
  return {
    accts: state.acct.accts,
    cats: state.cat.cats
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upload(args) { dispatch(actions.upload(args)) }
  }
}

class Ingest extends React.Component {
  constructor(props) {
    super()
    this.state = {
      acct: null,
      columns: [],
      rows: [],
      file: null
    }
    this.handleAcctSelect = this.handleAcctSelect.bind(this)
    this.handleAlignSubmit = this.handleAlignSubmit.bind(this)
    this.handleFileLoad = this.handleFileLoad.bind(this)
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }
  handleAcctSelect(evt, acct) {
    this.setState({ acct })
  }
  handleFileLoad(contents) {
    this.setState({ rows: formatRows(contents) })
  }
  handleFileSelect(file) {
    this.setState({ file })
  }
  handleAlignSubmit(evt, columns, includesHeader = true) {
    this.setState({ columns }, _ => {
      this.props.upload({
        acct: this.state.acct,
        cat: this.props.cats.find(c => c.abbrev === utils.INGEST_CAT_ABBREV),
        columns: this.state.columns,
        rows: includesHeader
          ? this.state.rows.slice(1)
          : this.state.rows
      })

      router.redirect('/')
    })
  }
  renderAcctInput() {
    return this.props.accts.length > 0 && !this.state.acct
      ? <AcctInput accts={this.props.accts} onSelect={this.handleAcctSelect} />
      : null
  }
  renderFileInput() {
    return this.state.acct && this.state.rows.length === 0
      ? <CsvInput onLoad={this.handleFileLoad} onSelect={this.handleFileSelect} />
      : null
  }
  renderTable() {
    return this.state.rows.length > 0 && this.state.columns.length === 0
      ? <CsvAligner onSubmit={this.handleAlignSubmit} rows={this.state.rows}/>
      : null
  }
  render() {
    return (
      <Chrome loadTransMeta={false}>
        <h1>Ingest</h1>
        {this.renderAcctInput()}
        {this.renderFileInput()}
        {this.renderTable()}
      </Chrome>
    )
  }
}

const ConnectedIngest = connect(mapStateToProps, mapDispatchToProps)(Ingest)

export default function render(store, el) {
  renderWithState(ConnectedIngest, el)
}
