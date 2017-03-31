const PgStore = require('koa-pg-session')

const sessionStore = new PgStore(process.env.DATABASE_URL)

function init() {
  return sessionStore.setup()
}

exports.init = init
exports.store = sessionStore
