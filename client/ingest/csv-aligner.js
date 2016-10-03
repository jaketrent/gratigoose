import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import React from 'react'
import styleable from 'react-styleable'

import { CHOOSABLE_COLUMNS } from './utils'
import css from './csv-aligner.css'
import CsvColumnOptions from './csv-column-options'
import CsvHeaderToggle from './csv-header-toggle'
import CsvTable from './csv-table'

const { arrayOf, func, node, string } = React.PropTypes

class CsvAligner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: CHOOSABLE_COLUMNS,
      includesHeader: true,
      selectedColumns: Array.from(Array(this.props.rows[0].length))
    }
    this.handleColumnDrop = this.handleColumnDrop.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggleIncludesHeader= this.handleToggleIncludesHeader.bind(this)
  }
  handleColumnDrop(index, name) {
    const columns = [...this.state.columns]
    const indexInColumns = columns.indexOf(name)
    if (indexInColumns > -1)
      columns.splice(indexInColumns, 1)

    const selectedColumns = [...this.state.selectedColumns]
    const indexInSelected = selectedColumns.indexOf(name)
    if (indexInSelected > -1)
      selectedColumns[indexInSelected] = undefined
    selectedColumns[index] = name

    this.setState({
      columns,
      selectedColumns
    })
  }
  handleSubmit(evt) {
    this.props.onSubmit(evt, this.state.selectedColumns, this.state.includesHeader)
  }
  handleToggleIncludesHeader(evt) {
    this.setState({ includesHeader: evt.target.checked })
  }
  render() {
    return (
      <div className={this.props.css.root}>
        <div className={this.props.css.controls}>
          <div className={this.props.css.options}>
            <CsvColumnOptions columns={this.state.columns} />
            <CsvHeaderToggle checked={this.state.includesHeader}
                            onChange={this.handleToggleIncludesHeader} />
          </div>
          <div className={this.props.css.submit}>
            <button className={this.props.css.btn}
                    onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>
        <CsvTable columns={this.state.selectedColumns}
                  onColumnDrop={this.handleColumnDrop}
                  rows={this.props.rows} />
      </div>
    )
  }
}

CsvAligner.propTypes = {
  onSubmit: func.isRequired,
  rows: arrayOf(arrayOf(node))
}

export default DragDropContext(HTML5Backend)(styleable(css)(CsvAligner))
