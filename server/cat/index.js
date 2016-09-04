const koa = require('koa')
const route = require('koa-route')

const repo = require('./repo')

const app = koa()

function* list() {
  const term = this.query.search
  const cats = term
    ? yield repo.search(this.db, term)
    : yield repo.findAll(this.db)

  this.body = {
    data: cats
  }
}

function* show(id) {
  const cats = yield repo.find(this.db, id)
  this.body = {
    data: cats
  }
}

app.use(route.get('/', list))
app.use(route.get('/:id', show))

module.exports = app
