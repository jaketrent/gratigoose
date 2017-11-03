// const koa = require('koa')
const express = require('express')
// const route = require('koa-route')

const catRepo = require('../cat/repo')
const expectedRepo = require('../expected/repo')
const repo = require('./repo')
const requireLogin = require('../auth/login')

// const app = new koa()
const app = express()

async function create(req, res) {
  const trans = await repo.create(req.app.get('db'), req.body)
  // TODO: generalize serialize
  return res.status(201).json({
    data: [trans]
  })
}

async function update(req, res) {
  const trans = await repo.update(req.app.get('db'), res.body)
  // TODO: generalize serialize
  return res.json({
    data: [trans]
  })
}

async function destroy(req, res) {
  await repo.destroy(req.app.get('db'), req.paramsid)
  return res.status(204)
}

async function list(req, res) {
  const transs = await repo.findAll(req.app.get('db'))
  return res.json({
    data: transs
  })
}

async function show(req, res) {
  const transs = await repo.find(req.app.get('db'), req.paramsid)
  return res.json({
    data: transs
  })
}

async function year(req, res) {
  const transs = await repo.findInYear(req.app.get('db'), req.params.year)
  return res.json({
    data: transs
  })
}

async function yearMonth(req, res) {
  const transs = await repo.findInYearMonth(
    req.app.get('db'),
    req.params.year,
    req.params.month
  )
  return res.json({
    data: transs
  })
}

// TODO: mv to budget ctrl
async function budget(req, res) {
  const db = req.app.get('db')
  const transs = await repo.findInYearMonth(
    db,
    req.params.year,
    req.params.month
  )
  const expecteds = await expectedRepo.findInYearMonth(
    db,
    req.params.year,
    req.params.month
  )
  return res.json({
    data: {
      expecteds,
      transs
    }
  })
}

app.use(requireLogin)
app.post('/', create)
app.put('/:id', update)
app.delete('/:id', destroy)
app.get('/', list)
app.get('/year/:year', year)
app.get('/year/:year/month/:month', yearMonth)
app.get('/year/:year/month/:month/budget', budget)
app.get('/:id', show)

module.exports = app
