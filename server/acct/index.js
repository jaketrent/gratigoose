const koa = require('koa')
const route = require('koa-route')

const repo = require('./repo')
const requireLogin = require('../auth/login')

const app = new koa()

async function list(ctx) {
  const term = this.query.term
  const accts = term
    ? await repo.search(this.db, term)
    : await repo.findAll(this.db)

  ctx.body = {
    data: accts
  }
}

async function show(ctx, id) {
  const accts = await repo.find(this.db, id)
  ctx.body = {
    data: accts
  }
}

app.use(requireLogin)
app.use(route.get('/', list))
app.use(route.get('/:id', show))

module.exports = app
