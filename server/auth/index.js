const bcrypt = require('bcrypt')
const koa = require('koa')
const passport = require('koa-passport')
const route = require('koa-route')

const repo = require('./repo')

const app = new koa()

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, { username: user })
});

function serialize(user) {
  return {
    data: {
      username: user.username
    }
  }
}

async function create(ctx, next) {
  const { username, password } = ctx.request.body
  try {
    const user = await repo.find(this.db, username)
    if (!user) {
      ctx.status = 401
      return ctx.body = { errors: [{ title: 'User not found', status: 401 }]}
    }

    const matches = await bcrypt.compare(password, user.passwordHash)
    if (matches) {
      ctx.body = serialize(user)
      return ctx.login(user)
    } else {
      ctx.status = 401
      return ctx.body = { errors: [{ title: 'Password does not match', status: 401 }]}
    }
  } catch (err) {
    ctx.status = 500
    return ctx.body = { errors: [{ title: err.message, status: 500, stack: err.stack }]}
  }
}

async function destroy(ctx) {
  ctx.logout()
  ctx.status = 204
}

async function show(ctx) {
  ctx.status = ctx.isAuthenticated() ? 200 : 401
  ctx.body = ctx.isAuthenticated()
    ? serialize(ctx.state.user)
    : {
      errors: [{ title: 'User not logged in', status: 401 }]
    }
}

app.use(route.post('/', create))
app.use(route.get('/', show))
app.use(route.delete('/', destroy))

module.exports = app
