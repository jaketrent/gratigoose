const fs = require('fs')

const separateColumns = line => line.split('\t')
const nameColumns = line => ({
  id: line[0],
  cat_id: line[1],
  amt: line[2],
  date: line[3]
})
const adjustColumns = line => {
  return Object.assign({}, line, {
    year: line.date.split('-')[0],
    month: line.date.split('-')[1]
  })
}
const nonEmptyColumns = line => line.id !== ''
const wellFormedDates = line => /\d{4}-\d{2}-\d{2}/.test(line.date)
const saveRow = (db, line) => {
  try {
    db.expected.insertSync({
      id: line.id,
      cat_id: line.cat_id,
      amt: line.amt,
      year: line.year,
      month: line.month,
      date: line.date
    })
  } catch(e) {
    return e
  }
}

exports.up = (db, options, done) => {
  const errs = fs.readFileSync(__dirname + '/../../../../expecteds.data.sql', 'utf8')
    .split('\n')
    .map(separateColumns)
    .map(nameColumns)
    .filter(nonEmptyColumns)
    .filter(wellFormedDates)
    .map(adjustColumns)
    .map(line => saveRow(db, line))
    .filter(err => err)
    .reduce((errs, err) => {
      errs = errs.concat([err])
      return errs
    }, [])

  db.resetExpectedId((err, result) => {
    if (err) errs.push(err)

    if (errs.length > 0) {
      console.error('Error in expected migration', errs) 
      done(errs)
    } else {
      console.log('Migrated expecteds')
      done()
    }
  })
}
