const debug = require('debug')('gg')
const koa = require('koa')
const route = require('koa-route')

// const store = require('./store')

const app = koa()

function* create() {
  debug('creating')
  this.body = {
    yay: 'query'
  }
}

app.use(route.post('/'), create)

module.exports = app
