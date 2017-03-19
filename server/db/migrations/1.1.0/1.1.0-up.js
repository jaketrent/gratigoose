const fs = require('fs')

const separateColumns = line => line.split('\t')
const nameColumns = line => ({
  id: line[0],
  title: line[1],
  abbrev: line[2],
  acctNum: line[3],
  suffix: line[4],
  routingNum: line[5],
  liquidable: line[6],
  created: line[7],
  updated: line[8]
})
const nonEmptyColumns = line => line.id !== ''
const saveRow = (db, line) => {
  try {
    db.acct.insertSync({
      id: line.id,
      name: line.title,
      abbrev: line.abbrev,
      liquidable: line.liquidable,
      created: line.created,
      updated: line.updated
    })
  } catch(e) {
    return e
  }
}

exports.up = (db, options, done) => {
  const errs = fs.readFileSync(__dirname + '/../../../../accounts.data.sql', 'utf8')
    .split('\n')
    .map(separateColumns)
    .map(nameColumns)
    .filter(nonEmptyColumns)
    .map(line => saveRow(db, line))
    .filter(err => err)
    .reduce((errs, err) => {
      errs = errs.concat([err])
      return errs
    }, [])

  db.resetAcctId((err, result) => {
    if (err) errs.push(err)

    if (errs.length > 0) {
      console.error('Error in account migration', errs) 
      done(errs)
    } else {
      console.log('Migrated accounts')
      done()
    }
  })
}
