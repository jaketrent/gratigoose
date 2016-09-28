import * as d3 from 'd3'

export const DEFAULT_MARGINS = { top: 0, right: 0, bottom: 0, left: 0 }

function getNum(numStr) {
  return parseFloat(numStr.replace('px', ''))
}

class PlanVsActivityVizD3 {
  constructor(el, config) {
    this.el = el
    this.config = this.constructor.defaultConfig
    this.init(config)
  }
  setConfig(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig
    }
  }
  init(config) {
    this.setConfig(config)
    this.initScales()
  }
  initScales() {
    const x0 = d3.scaleBand()
      .rangeRound([0, this.getChartWidth()])
      .padding(0)
      .align(0.5)

    const x1 = d3.scaleBand()
      .paddingOuter(0.25)
      .align(0.5)

    const y = d3.scaleLinear()
      .range([this.getChartHeight(), 0])

    const color = d3.scaleOrdinal()
      .range(this.config.colors)

    this.setConfig({ x0, x1, y, color })
  }
  getData() {
    return this.data
  }
  getChartWidth() {
    return getNum(d3.select(this.el).style('width')) - this.config.margin.left - this.config.margin.right
  }
  getChartHeight() {
    return getNum(d3.select(this.el).style('height')) - this.config.margin.top - this.config.margin.bottom
  }
  setData(data) {
    this.data = data
  }
  setDomain() {
    this.config.x0
      .domain(this.getData().map(d => d.x))

    this.config.x1
      .range([0, this.config.x0.bandwidth()])
      .domain(this.getData()[0].ys.map((_, i) => i))

    this.config.y
      .domain([0, d3.max(this.getData(), d => d3.max(d.ys, y => y))])
  }
  clear() {
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild)
    }
  }
  drawSvg() {
    const svg = d3.select(this.el)

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.config.margin.left + ',' + this.config.margin.top + ')')

    this.svg = g
  }
  drawBars() {
    const { animationDuration, color, css, x0, x1, y } = this.config

    const areas = this.svg.selectAll('.' + this.config.css.area)
        .data(this.getData())
      .enter().append('g')
        .attr('class', css.area)
        .attr('transform', d => 'translate(' + x0(d.x) + ')')
        .attr('width', x0.bandwidth())

    const bars = areas.selectAll('.' + css.bar)
        .data((d, ix) => d.ys.map(yval => ({ y: yval, i: ix })))
      .enter().append('rect')
        .attr('class', css.bar)
        .attr('x', (_, i) => x1(i))
        .attr('y', this.getChartHeight())
        .attr('width', x1.bandwidth())
        .attr('height', 0)
        .style('fill', (_, i) => color(i))

    bars.transition()
      .duration(animationDuration)
      .delay((d, i) => d.i * 400 + i * 70)
      .attr('y', d => y(d.y))
      .attr('height', d => this.getChartHeight() - y(d.y))
  }
  draw(data, config) {
    this.setData(data)
    this.setConfig(config)
    this.setDomain()

    this.clear()
    this.drawSvg()
    this.drawBars()
  }
}

PlanVsActivityVizD3.defaultConfig = {
  colors: ['#ababab', '#00ca40'],
  margin: DEFAULT_MARGINS,
  animationDuration: 1000
};

export default PlanVsActivityVizD3
