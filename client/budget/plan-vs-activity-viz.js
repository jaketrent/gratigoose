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
  getChartConfig(config) {
    return omit({
      ...this.props,
      ...config
    }, key => key === 'data')
  }
  componentDidMount() {
    this.chart = new PlanVsActivityVizD3(this.svg, this.getChartConfig())

    this.chart.draw(formatData(this.props.data), this.props)
  }
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps)
  }
  componentWillReceiveProps(nextProps) {
    if (this.isDataChange(this.props, nextProps))
      this.chart.draw(formatData(nextProps.data), nextProps)
  }
  isDataChange(props, nextProps) {
    return !isEqual(props.data, nextProps.data)
  }
  render() {
    return (
      <svg className={this.props.css.root}
           ref={el => this.svg = el}
           viewBox="0 0 350 200"></svg>
    )
  }
}

PlanVsActivityViz.propTypes = {
  data: arrayOf(shape({
    ys: arrayOf(number),
    x: string
  })).isRequired,
}

export default styleable(css)(PlanVsActivityViz)
