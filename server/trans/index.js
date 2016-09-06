const koa = require('koa')
const route = require('koa-route')

const repo = require('./repo')

const app = koa()

function* create() {
  const trans = yield repo.create(this.db, this.request.body)
  // TODO: generalize serialize
  this.body = {
    data: trans
  }
}

function* list() {
  const transs = yield repo.findAll(this.db)
  this.body = {
    data: transs
  }
}

function* show(id) {
  const transs = yield repo.find(this.db, id)
  this.body = {
    data: transs
  }
}

function* year(year) {
  const transs = yield repo.findInYear(this.db, year)
  this.body = {
    data: transs
  }
}

app.use(route.post('/', create))
app.use(route.get('/', list))
app.use(route.get('/year/:year', year))
app.use(route.get('/:id', show))

module.exports = app
