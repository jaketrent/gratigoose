import Dimensions from 'react-dimensions'
import React from 'react'
import styleable from 'react-styleable'

import css from './plan-vs-activity-viz.css'
import { omit } from '../common/object'
import PlanVsActivityVizD3 from './plan-vs-activity-viz-d3'

const { shape, string, number, arrayOf, func } = React.PropTypes

function isEqual(data1, data2) {
  // TODO: fix this to actually do value comparison
  return data1 === data2
}

function formatData(data) {
  return data.map(d => {
    return {
      ...d,
      ys: d.ys.map(y => Math.abs(y))
    }
  })
}

class PlanVsActivityViz extends React.Component {
  getChartConfig(props) {
    return omit({
      ...props,
      height: props.containerHeight,
      width: props.containerWidth
    }, key => ['data', 'containerHeight', 'containerWidth'].includes(key))
  }
  componentDidMount() {
    const config = this.getChartConfig(this.props)
    this.chart = new PlanVsActivityVizD3(this.svg, config)

    this.chart.draw(formatData(this.props.data), config)
  }
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps)
  }
  componentWillReceiveProps(nextProps) {
    const config = this.getChartConfig(nextProps)
    if (this.isDimensionChange(this.props, nextProps)) {
      this.chart.init(config)
      this.chart.redraw(formatData(nextProps.data), config)
    }

    if (this.isDataChange(this.props, nextProps))
      this.chart.redraw(formatData(nextProps.data), config)
  }
  isDataChange(props, nextProps) {
    return !isEqual(props.data, nextProps.data)
  }
  isDimensionChange(props, nextProps) {
    return props.containerHeight !== nextProps.containerHeight
        || props.containerWidth !== nextProps.containerWidth
  }
  render() {
    return (
      <svg className={this.props.css.root}
           height={this.props.containerHeight}
           width={this.props.containerWidth}
           ref={el => this.svg = el}></svg>
    )
  }
}

PlanVsActivityViz.propTypes = {
  data: arrayOf(shape({
    ys: arrayOf(number),
    x: string
  })).isRequired,
  formatLabel: func,
  height: number,
  width: number
}

export default styleable(css)(Dimensions({ elementResize: true })(PlanVsActivityViz))
