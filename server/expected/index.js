const koa = require('koa')
const route = require('koa-route')

const catRepo = require('../cat/repo')
const expectedRepo = require('../expected/repo')
const repo = require('./repo')
const requireLogin = require('../auth/login')

const app = new koa()

async function create(ctx) {
  const expected = await repo.create(this.db, this.request.body)
  // TODO: generalize serialize
  ctx.status = 201
  ctx.body = {
    data: [expected]
  }
}

async function update(ctx, id) {
  const expected = await repo.update(this.db, this.request.body)
  // TODO: generalize serialize
  ctx.body = {
    data: [expected]
  }
}

app.use(requireLogin)
app.use(route.post('/', create))
app.use(route.put('/:id', update))

module.exports = app
