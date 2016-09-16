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
      columns: [
        'amt',
        'date',
        'desc'
      ],
      selectedColumns: Array.from(Array(this.props.rows[0].length))
    }
    this.handleColumnDrop = this.handleColumnDrop.bind(this)
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
  render() {
    return (
      <div>
        <CsvColumnOptions columns={this.state.columns} />
        <CsvTable columns={this.state.selectedColumns}
                  onColumnDrop={this.handleColumnDrop}
                  rows={this.props.rows} />
      </div>
    )
  }
}

CsvAligner.propTypes = {
  rows: arrayOf(arrayOf(node))
}

export default DragDropContext(HTML5Backend)(CsvAligner)
