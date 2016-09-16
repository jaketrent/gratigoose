import { DragSource } from 'react-dnd'
import React from 'react'

const { arrayOf, bool, func, string } = React.PropTypes

const colSource = {
  beginDrag(props) {
    return {
      name: props.name
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

function Option(props) {
  return props.connectDragSource(
    <div style={{ opacity: props.isDragging ? 0.5 : 1 }}>{props.name}</div>
  )
}

Option.propTypes = {
  connectDragSource: func.isRequired,
  isDragging: bool.isRequired,
  name: string.isRequired
}

const DraggableOption = DragSource('CSVCOL', colSource, collect)(Option)

function renderOptions(props) {
  return props.columns.map((c, i) => <DraggableOption key={i} name={c} />)
}

function CsvColumnOptions(props) {
  return (
    <div>
      {renderOptions(props)}
    </div>
  )
}

CsvColumnOptions.propTypes = {
  columns: arrayOf(string)
}

export default CsvColumnOptions
