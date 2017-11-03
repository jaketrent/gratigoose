require('dotenv').config({ silent: true })

// const convert = require('koa-convert')
// const bodyParser = require('koa-bodyparser')
const bodyParser = require('body-parser')
const debug = require('debug')('mm')
// const error = require('koa-json-error')
const fs = require('fs')
// const logger = require('koa-logger')
// const koa = require('koa')
const express = require('express')
// const mount = require('koa-mount')
// const route = require('koa-route')
const session = require('koa-generic-session')

const acct = require('./acct')
const auth = require('./auth')
const cat = require('./cat')
const expected = require('./expected')
const db = require('./db')
const passport = require('koa-passport')
const static = require('./static')
const { store } = require('./auth/session')
const trans = require('./trans')

// const app = new koa()
const app = express()
app.keys = [process.env.SECRET_KEY]
const port = process.env.PORT || 3000

// app.use(logger())
// app.use(mount('/static', static))
app.use(express.static('static'))
app.use(
  convert(
    session({
      cookie: {
        path: '/',
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000,
        rewrite: true,
        signed: true
      },
      key: 'gratigooseSessionId',
      store
    })
  )
)
app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())
// app.use(async function catchErrors(ctx, next) {
//   try {
//     await next()
//   } catch(err) {
//     console.error(err)
//     ctx.status = err.status || 500
//     ctx.body = {
//       errors: [{
//         stack: err.stack,
//         status: ctx.status,
//         title: err.message
//       }]
//     }
//   }
// })
app.use('/api/v1/acct', acct)
app.use('/api/v1/auth', auth)
app.use('/api/v1/cat', cat)
app.use('/api/v1/expected', expected)
app.use('/api/v1/trans', trans)
app.get('*', index)

function index(req, res) {
  res.send(fs.readFileSync('./client/index.html', 'utf8'))
}

db.connect((err, db) => {
  if (err) throw err

  app.set('db', db)
  app.listen(port)
  debug(`Listening on port ${port}...`)
})
