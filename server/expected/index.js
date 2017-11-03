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
  const expected = await repo.create(req.app.get('db'), req.body)
  // TODO: generalize serialize
  return res.status(201).json({
    data: [expected]
  })
}

async function update(req, res) {
  const expected = await repo.update(req.app.get('db'), req.body)
  // TODO: generalize serialize
  return res.json({
    data: [expected]
  })
}

app.use(requireLogin)
app.post('/', create)
app.put('/:id', update)

module.exports = app
