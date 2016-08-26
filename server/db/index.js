const massive = require('massive')

exports.connect = function connect(done) {
  massive.connect({
    connectionString: process.env.DB_CONN_URL,
    scripts: __dirname
  }, function (err, db) {
    if (err) {
      return console.error('Error connecting to database', err)
      throw err
    }

    done(null, db)
  })
}
