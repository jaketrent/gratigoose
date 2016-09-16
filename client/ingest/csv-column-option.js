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

function CsvColumnOption(props) {
  return props.connectDragSource(
    <div style={{ opacity: props.isDragging ? 0.5 : 1 }}>{props.name}</div>
  )
}

CsvColumnOption.propTypes = {
  connectDragSource: func.isRequired,
  isDragging: bool.isRequired,
  name: string.isRequired
}

export default DragSource('CSVCOL', colSource, collect)(CsvColumnOption)
