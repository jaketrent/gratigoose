import { DropTarget } from 'react-dnd'
import React from 'react'
import styleable from 'react-styleable'

import css from './csv-table.css'
import CsvColumnOption from './csv-column-option'

const { arrayOf, bool, func, node, number, string } = React.PropTypes

function renderCell(props, cell, i) {
  return (
    <td key={i}>
      {cell}
    </td>
  )
}

function renderCells(props, row) {
  return row.map((c, i) => renderCell(props, c, i))
}

function renderRow(props, row, i) {
  return (
    <tr key={i}>
      {renderCells(props, row)}
    </tr>
  )
}

function renderRows(props) {
  return props.rows.map((r, i) => renderRow(props, r, i))
}

const colTarget = {
  drop(props, monitor) {
    props.onDrop(props.index, monitor.getItem().name)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    didDrop: monitor.didDrop(),
    isOver: monitor.isOver()
  }
}

function Column(props) {
  const className = props.isOver
    ? props.css.colHover
    : props.css.col
  return props.connectDropTarget(
    <td className={className}>
      {props.name
        ? <CsvColumnOption css={{ root: props.css.optionRootDropped }}
                           name={props.name} />
        : null
      }
    </td>
  )
}

Column.PropTypes = {
  connectDropTarget: func.isRequired,
  index: number.isRequired,
  isOver: bool,
  onDrop: func.isRequired,
  name: string
}

const DroppableColumn = DropTarget('CSVCOL', colTarget, collect)(Column)

function renderColumns(props) {
  return props.columns.map((c, i) => {
    return (
      <DroppableColumn css={props.css}
                       index={i}
                       key={i}
                       onDrop={props.onColumnDrop}
                       name={c} />
    )
  })
}

function CsvTable(props) {
  return (
    <table className={props.css.root}>
      <thead>
        <tr>
          {renderColumns(props)}
        </tr>
      </thead>
      <tbody>
        {renderRows(props)}
      </tbody>
    </table>
  )
}

CsvTable.propTypes = {
  columns: arrayOf(string),
  onColumnDrop: func.isRequired,
  rows: arrayOf(arrayOf(node))
}

export default styleable(css)(CsvTable)
