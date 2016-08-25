require('dotenv').config()

const fs = require('fs')
const massiveMigrate = require('massive-migrate')
const path = require('path')

const connectionString = process.env.DB_CONN_URL
const directory = path.join(__dirname, 'migrations')

fs.readFile(path.join(__dirname, '..', '..', 'package.json'), (err, data) => {
  if (err) return console.error('Error opening packagejson', err)

  const pkg = JSON.parse(data)
  const options =  { connectionString,  directory }
  const name = pkg.version

  massiveMigrate(options, (err, migrations) => {
    if (err) return console.error('Error connecting to db', err)

    migrations.runUpMigration({ name }, err => {
      if (err) return console.error('Error in migration', err)
      else console.log('Migration done.')
    })
  })
})
