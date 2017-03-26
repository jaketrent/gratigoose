exports.up = (db, options, done) => {
  db.createUserTable((err, result) => {
    if (err) console.error('Error in user table create', err)
    else console.log('Created user table.')
    done(err)
  })
}

