const koa = require('koa')
const route = require('koa-route')

const repo = require('./repo')

const app = new koa()

async function list(ctx) {
  const term = this.query.term
  const cats = term
    ? await repo.search(this.db, term)
    : await repo.findAll(this.db)

  ctx.body = {
    data: cats
  }
}

async function show(ctx, id) {
  const cats = await repo.find(this.db, id)
  ctx.body = {
    data: cats
  }
}

app.use(route.get('/', list))
app.use(route.get('/:id', show))

module.exports = app
