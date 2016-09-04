const koa = require('koa')
const route = require('koa-route')

const repo = require('./repo')

const app = koa()

function* list() {
  const term = this.query.term
  const accts = term
    ? yield repo.search(this.db, term)
    : yield repo.findAll(this.db)

  this.body = {
    data: accts
  }
}

function* show(id) {
  const accts = yield repo.find(this.db, id)
  this.body = {
    data: accts
  }
}

app.use(route.get('/', list))
app.use(route.get('/:id', show))

module.exports = app
