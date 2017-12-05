// const PgStore = require('koa-pg-session')

// const sessionStore = new PgStore(process.env.DATABASE_URL)

const { Client, Pool } = require('pg')
const escape = require('pg-escape')

class PgSession {
  static get defaultOpts() {
    return {
      schema: 'public',
      table: 'session',
      create: true, //Create a new session table by default
      cleanupTime: 2700000 // 45 min
    }
  }
  constructor(options) {
    this.pool = new Pool({
      connectionString: options.connectionString
    })
    this.isSetup = false
    this.options = { ...PgSession.defaultOpts, ...options }
  }
  async setup() {
    if (this.isSetup) return

    this.db = await this.pool.connect()
    this.query = async (query, params) => {
      const client = await this.pool.connect()
      let result
      try {
        result = await client.query(query, params)
        client.release()
      } catch (err) {
        client.release()
        console.log('query error', err)
      }

      return result
    }
    ;(await this.options.create)
      ? this.query(this.createSql)
      : Promise.resolve()

    this.scheduleExpiredSessionCleanup()
    this.isSetup = true
  }
  scheduleExpiredSessionCleanup() {
    let sess = this

    setTimeout(function interval() {
      sess.query(sess.cleanupSql, Date.now() / 1000).then(() => {
        setTimeout(interval, sess.options.cleanupTime)
      })
    }, sess.options.cleanupTime)
  }
  async get(key) {
    if (!this.isSetup) throw new Error('Call session.setup() before accessing')

    const existingSession = await this.query(this.getValueSql, [key])
    console.log('existing', existingSession)

    return existingSession && existingSession.length > 0
      ? existingSession[0].session
      : false
  }
  async set(key, sess, maxAge) {
    if (!this.isSetup) throw new Error('Call session.setup() before mutating')

    maxAge = maxAge || 2700000 // 45 min
    const expiry = (Date.now() + maxAge) / 1000
    const existingSession = await this.get(key)
    console.log('set on existing', existingSession)
    if (existingSession)
      await this.query(this.updateValueSql, [sess, expiry, key])
    else await this.query(this.insertValueSql, [key, sess, expiry])
  }
  async destroy(key) {
    await this.query(this.destroyValueSql, [key])
  }

  get createSql() {
    return escape(
      'CREATE SCHEMA IF NOT EXISTS %I;\n' +
      'CREATE TABLE IF NOT EXISTS %I.%I (\n' +
      '   id TEXT NOT NULL PRIMARY KEY,\n' + //This is the Koa session ID
      '   expiry timestamp NOT NULL,\n' + //This is the timestamp of when it will expire
      '   session JSON\n' + //All the session data that has been saved
        ');',
      this.options.schema,
      this.options.schema,
      this.options.table
    )
  }
  get getValueSql() {
    return escape(
      'SELECT session FROM %I.%I WHERE id = $1;',
      this.options.schema,
      this.options.table
    )
  }
  get updateValueSql() {
    return escape(
      'UPDATE %I.%I SET session = $1, expiry = to_timestamp($2) WHERE id = $3;',
      this.options.schema,
      this.options.table
    )
  }
  get insertValueSql() {
    return escape(
      'INSERT INTO %I.%I(id, session, expiry) VALUES($1, $2, to_timestamp($3) );',
      this.options.schema,
      this.options.table
    )
  }
  get destroyValueSql() {
    return escape(
      'DELETE FROM %I.%I WHERE id = $1;',
      this.options.schema,
      this.options.table
    )
  }
  get cleanupSql() {
    return escape(
      'DELETE FROM %I.%I WHERE expiry <= to_timestamp($1);',
      this.options.schema,
      this.options.table
    )
  }
}

async function create() {
  const store = new PgSession({ connectionString: process.env.DATABASE_URL })
  await store.setup()
  return store
}

exports.create = create
