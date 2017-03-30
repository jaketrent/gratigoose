require('dotenv').config({ silent: true })

const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const debug = require('debug')('mm')
const error = require('koa-json-error')
const fs = require('fs')
const logger = require('koa-logger')
const koa = require('koa')
const mount = require('koa-mount')
const route = require('koa-route')
const session = require('koa-generic-session')

const acct = require('./acct')
const auth = require('./auth')
const cat = require('./cat')
const expected = require('./expected')
const db = require('./db')
const passport = require('koa-passport')
const static = require('./static')
const trans = require('./trans')

const app = new koa()
app.keys = [process.env.SECRET_KEY]
const port = process.env.PORT || 3000

app.use(logger())
app.use(mount('/static', static))
app.use(convert(session({
  cookie: {
    path: '/',
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
    rewrite: true,
    signed: true
  },
  key: 'gratigooseSessionId'
})))
app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(async function catchErrors(ctx, next) {
  try {
    await next()
  } catch(err) {
    console.error(err)
    ctx.status = err.status || 500
    ctx.body = {
      errors: [{
        stack: err.stack,
        status: ctx.status,
        title: err.message
      }]
    }
  }
})
app.use(mount('/api/v1/acct', acct))
app.use(mount('/api/v1/auth', auth))
app.use(mount('/api/v1/cat', cat))
app.use(mount('/api/v1/expected', expected))
app.use(mount('/api/v1/trans', trans))
app.use(route.get('*', index))

function index(ctx) {
  ctx.body = fs.readFileSync('./client/index.html', 'utf8')
}

db.connect((err, db) => {
  if (err) throw err

  app.context.db = db
  app.listen(port)
  debug(`Listening on port ${port}...`)
})
