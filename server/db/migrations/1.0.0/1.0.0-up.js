exports.up = (db, options, done) => {
  db.createTransTable((err, result) => {
    if (err) console.error('Error in trans table create', err)
    else console.log('Created trans table.')
    done(err)
  })
}
