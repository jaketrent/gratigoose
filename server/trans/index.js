const koa = require('koa')
const route = require('koa-route')

const catRepo = require('../cat/repo')
const expectedRepo = require('../expected/repo')
const repo = require('./repo')
const requireLogin = require('../auth/login')

const app = new koa()

async function create(ctx) {
  const trans = await repo.create(this.db, this.request.body)
  // TODO: generalize serialize
  ctx.status = 201
  ctx.body = {
    data: [trans]
  }
}

async function update(ctx) {
  const trans = await repo.update(this.db, this.request.body)
  // TODO: generalize serialize
  ctx.body = {
    data: [trans]
  }
}

async function destroy(ctx, id) {
  await repo.destroy(this.db, id)
  ctx.status = 204
}

async function list(ctx) {
  const transs = await repo.findAll(this.db)
  ctx.body = {
    data: transs
  }
}

async function show(ctx, id) {
  const transs = await repo.find(this.db, id)
  ctx.body = {
    data: transs
  }
}

async function year(ctx, year) {
  const transs = await repo.findInYear(this.db, year)
  ctx.body = {
    data: transs
  }
}

async function yearMonth(ctx, year, month) {
  const transs = await repo.findInYearMonth(this.db, year, month)
  ctx.body = {
    data: transs
  }
}

// TODO: mv to budget ctrl
async function budget(ctx, year, month) {
  const transs = await repo.findInYearMonth(this.db, year, month)
  const expecteds = await expectedRepo.findInYearMonth(this.db, year, month)
  ctx.body = {
    data: {
      expecteds,
      transs
    }
  }
}

app.use(requireLogin)
app.use(route.post('/', create))
app.use(route.put('/:id', update))
app.use(route.delete('/:id', destroy))
app.use(route.get('/', list))
app.use(route.get('/year/:year', year))
app.use(route.get('/year/:year/month/:month', yearMonth))
app.use(route.get('/year/:year/month/:month/budget', budget))
app.use(route.get('/:id', show))

module.exports = app
