require('dotenv').config()

const program = require('commander')

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
    } catch (err) {
      console.log('Error creating user', err)
    }
  })
}

program
  .version(package.version)
  .option('-u, --username <username>', 'Username')
  .option('-p, --password <password>', 'Plaintext password')
  .parse(process.argv)

console.log('input', program.username, program.password)
if (program.username && program.password)
  create(program.username, program.password)
else
  console.log('Error: -u username and -p password required.')
