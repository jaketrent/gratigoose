import { DragSource } from 'react-dnd'
import React from 'react'
import styleable from 'react-styleable'

import css from './csv-column-option.css'

const { arrayOf, bool, func, string } = React.PropTypes

const colSource = {
  beginDrag(props) {
    return {
      name: props.name
    }
  }
}

function collect(connect, monitor) {
  console.log('monitor.didDrop', monitor.didDrop())
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    didDrop: monitor.didDrop(),
    isDragging: monitor.isDragging()
  }
}

function CsvColumnOption(props) {
  const className = props.isDragging
    ? props.css.rootDragging
    : props.didDrop
      ? props.css.rootDropped
      : props.css.root
  return props.connectDragSource(
    <div className={className}>{props.name}</div>
  )
}

CsvColumnOption.propTypes = {
  connectDragSource: func.isRequired,
  isDragging: bool.isRequired,
  name: string.isRequired
}

export default DragSource('CSVCOL', colSource, collect)(styleable(css)(CsvColumnOption))
