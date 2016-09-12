const massive = require('massive')
const path = require('path')

exports.connect = function connect(done) {
  massive.connect({
    connectionString: process.env.DB_CONN_URL,
    scripts: path.join(__dirname, 'queries')
  }, (err, db) => {
    if (err) {
      return console.error('Error connecting to database', err)
      throw err
    }

    done(null, db)
  })
}
