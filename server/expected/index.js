const koa = require('koa')
const route = require('koa-route')

const catRepo = require('../cat/repo')
const expectedRepo = require('../expected/repo')
const repo = require('./repo')

const app = koa()

function* create() {
  const expected = yield repo.create(this.db, this.request.body)
  // TODO: generalize serialize
  this.status = 201
  this.body = {
    data: [expected]
  }
}

function* update(id) {
  const expected = yield repo.update(this.db, this.request.body)
  // TODO: generalize serialize
  this.body = {
    data: [expected]
  }
}

app.use(route.post('/', create))
app.use(route.put('/:id', update))

module.exports = app
