// const koa = require('koa')
const express = require('express')
// const route = require('koa-route')

const repo = require('./repo')
const requireLogin = require('../auth/login')

// const app = new koa()
const app = express()

async function list(req, res) {
  const db = req.app.get('db')
  const term = req.query.term
  const accts = term ? await repo.search(db, term) : await repo.findAll(db)

  ctx.body = {
    data: accts
  }
}

async function show(req, res) {
  const accts = await repo.find(req.app.get('db'), req.params.id)
  ctx.body = {
    data: accts
  }
}

app.use(requireLogin)
app.get('/', list)
app.get('/:id', show)

module.exports = app
