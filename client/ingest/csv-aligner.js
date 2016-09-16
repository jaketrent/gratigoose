import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import React from 'react'

import CsvColumnOptions from './csv-column-options'
import CsvTable from './csv-table'

const { arrayOf, node, string } = React.PropTypes

class CsvAligner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedColumns: Array.from(Array(this.props.rows[0].length))
    }
    this.handleColumnDrop = this.handleColumnDrop.bind(this)
  }
  handleColumnDrop(index, name) {
    const selectedColumns = [...this.state.selectedColumns]
    selectedColumns[index] = name
    this.setState({
      selectedColumns
    })
  }
  render() {
    // TODO: remove used columns from options
    return (
      <div>
        <CsvColumnOptions columns={this.props.columns} />
        <CsvTable columns={this.state.selectedColumns}
                  onColumnDrop={this.handleColumnDrop}
                  rows={this.props.rows} />
      </div>
    )
  }
}

CsvAligner.propTypes = {
  columns: arrayOf(string),
  rows: arrayOf(arrayOf(node))
}

export default DragDropContext(HTML5Backend)(CsvAligner)
