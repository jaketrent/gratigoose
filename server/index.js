require('dotenv').config()

const bodyParser = require('koa-bodyparser')
const debug = require('debug')('mm')
const fs = require('fs')
const logger = require('koa-logger')
const koa = require('koa')
const mount = require('koa-mount')
const route = require('koa-route')

const acct = require('./acct')
const cat = require('./cat')
const expected = require('./expected')
const db = require('./db')
const static = require('./static')
const trans = require('./trans')

const app = koa()
const port = process.env.PORT || 3000

app.use(logger())
app.use(mount('/static', static))
app.use(bodyParser())
app.use(mount('/api/v1/acct', acct))
app.use(mount('/api/v1/cat', cat))
app.use(mount('/api/v1/expected', expected))
app.use(mount('/api/v1/trans', trans))
app.use(route.get('*', index))

function* index() {
  this.body = fs.readFileSync('./client/index.html', 'utf8')
}

db.connect((err, db) => {
  if (err) throw err

  app.context.db = db
  app.listen(port)
  debug(`Listening on port ${port}...`)
})
