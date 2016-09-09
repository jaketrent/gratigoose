const koa = require('koa')
const route = require('koa-route')

const catRepo = require('../cat/repo')
const expectedRepo = require('../expected/repo')
const repo = require('./repo')

const app = koa()

function* create() {
  const trans = yield repo.create(this.db, this.request.body)
  // TODO: generalize serialize
  this.body = {
    data: [trans]
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

function* yearMonth(year, month) {
  const transs = yield repo.findInYearMonth(this.db, year, month)
  this.body = {
    data: transs
  }
}

// TODO: mv to budget ctrl
function* budget(year, month) {
  const transs = yield repo.findInYearMonth(this.db, year, month)
  const expecteds = yield expectedRepo.findInYearMonth(this.db, year, month)
  this.body = {
    data: {
      expecteds,
      transs
    }
  }
}

app.use(route.post('/', create))
app.use(route.get('/', list))
app.use(route.get('/year/:year', year))
app.use(route.get('/year/:year/month/:month', yearMonth))
app.use(route.get('/year/:year/month/:month/budget', budget))
app.use(route.get('/:id', show))

module.exports = app
