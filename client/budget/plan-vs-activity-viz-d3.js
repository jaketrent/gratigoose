import * as d3 from 'd3'

export const DEFAULT_MARGINS = { top: 20, right: 0, bottom: 0, left: 0 }

function getNum(numStr) {
  return parseFloat(numStr.replace('px', ''))
}

function barDelay(d, i) {
  return d.ix * 400 + i * 70
}

function barLabelDelay(startDelay, d, i) {
  return startDelay + barDelay(d, i)
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
    return this.config.width - this.config.margin.left - this.config.margin.right
  }
  getChartHeight() {
    return this.config.height - this.config.margin.top - this.config.margin.bottom
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

    this.setConfig({ svg: g })
  }
  drawBars() {
    const { animationDuration, color, css, svg, x0, x1, y } = this.config

    const areas = svg.selectAll('.' + this.config.css.area)
        .data(this.getData())

    areas
      .enter().append('g')
        .attr('class', css.area)
        .attr('transform', d => 'translate(' + x0(d.x) + ')')
        .attr('width', x0.bandwidth())

    areas.transition()
      .attr('transform', d => 'translate(' + x0(d.x) + ')')
      .attr('width', x0.bandwidth())

    const bars = areas.selectAll('.' + css.bar)
      .data((d, ix) => d.ys.map(yval => ({ y: yval, ix })))

    bars
      .enter().append('rect')
        .attr('class', css.bar)
        .attr('x', (_, i) => x1(i))
        .attr('y', this.getChartHeight())
        .attr('width', x1.bandwidth())
        .attr('height', 0)
        .style('fill', (_, i) => color(i))

    bars.transition()
      .duration(animationDuration)
      .delay(barDelay)
      .attr('x', (_, i) => x1(i))
      .attr('y', d => y(d.y))
      .attr('width', x1.bandwidth())
      .attr('height', d => this.getChartHeight() - y(d.y))

    this.setConfig({ bars })
  }
  drawBarLabels() {
    const { animationDuration, bars, css, formatLabel, labelMargin, svg, x0, x1, y } = this.config
    const numBarsInArea = this.getData()[0].ys.length
    const midBar = Math.ceil(x1.bandwidth() / 2)

    const labels = svg.selectAll('.' + css.barLabel)
      .data(bars.data())

    function position(sel) {
      return sel
        .attr('x', (d, i) => {
          const offsetForArea = d.ix * x0.bandwidth()
          const offsetInArea = x1(i % numBarsInArea)
          return offsetForArea + offsetInArea + midBar
        })
        .attr('y', d => y(d.y) - labelMargin.bottom)
        .attr('width', x1.bandwidth())
        .text(d => d.y > 0 ? formatLabel(d.y) : '')
        .transition()
          .delay(barLabelDelay.bind(this, animationDuration))
          .style('opacity', 1)
    }

    labels.enter()
      .append('text')
      .attr('class', css.barLabel)
      .call(position)

    labels.transition()
      .call(position)
  }
  draw(data, config) {
    this.clear()
    this.drawSvg()

    this.redraw(data, config)
  }
  redraw(data, config) {
    this.setData(data)
    this.setConfig(config)
    this.setDomain()

    this.drawBars()
    this.drawBarLabels()
  }
}

PlanVsActivityVizD3.defaultConfig = {
  animationDuration: 1000,
  colors: ['#ababab', '#00ca40'],
  formatLabel: x => x,
  labelMargin: { bottom: 5 },
  margin: DEFAULT_MARGINS
};

export default PlanVsActivityVizD3
