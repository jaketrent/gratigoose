const bcrypt = require('bcrypt')
// const koa = require('koa')
const express = require('express')
// TODO: replace
const passport = require('koa-passport')
// const route = require('koa-route')

const repo = require('./repo')

// const app = new koa()
const app = express()

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, { username: user })
})

function serialize(user) {
  return {
    data: {
      username: user.username
    }
  }
}

async function create(req, res) {
  const { username, password } = req.body
  try {
    const user = await repo.find(req.app.get('db'), username)
    if (!user) {
      return res
        .status(401)
        .json({ errors: [{ title: 'User not found', status: 401 }] })
    }

    const matches = await bcrypt.compare(password, user.passwordHash)
    if (matches) {
      // TODO: come back for auth
      ctx.body = serialize(user)
      return ctx.login(user)
    } else {
      console.log('u, p', username, password)
      return res
        .status(401)
        .json({ errors: [{ title: 'Password does not match', status: 401 }] })
    }
  } catch (err) {
    return res
      .json(500)
      .json({ errors: [{ title: err.message, status: 500, stack: err.stack }] })
  }
}

// TODO: come back auth
async function show(req, res) {
  return res.json(
    req.isAuthenticated() ? serialize(ctx.state.user) : { data: null }
  )
}

async function destroy(req, res) {
  req.logout()
  // ctx.status = 204
  return res.status(204)
}

app.post('/', create)
app.get('/', show)
app.delete('/', destroy)

module.exports = app
