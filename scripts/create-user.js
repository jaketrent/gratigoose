require('dotenv').config()

const prompt = require('prompt')

const db = require('../server/db')
const package = require('../package.json')
const repo = require('../server/auth/repo')

function create(username, password) {
  db.connect(async (err, db) => {
    if (err)
      return console.log('Db connection problem')

    try {
      const user = await repo.create(db, { username, password })
      console.log('User created.')
      process.exit(0)
    } catch (err) {
      console.log('Error creating user', err)
      process.exit(1)
    }
  })
}

prompt.start()

prompt.get(['username', 'password'], (err, result) => {
  if (result.username && result.password) {
    create(result.username, result.password)
  } else {
    console.log('Error: username and password required.')
    process.exit(1)
  }
})

