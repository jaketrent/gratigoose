const fs = require('fs')

const separateColumns = line => line.split('\t')
const nameColumns = line => ({
  id: line[0],
  trans_date: line[1],
  desc: line[2],
  amt: line[3],
  acct_id: line[4],
  cat_id: line[5],
  location: line[6],
  check_num: line[7],
  cleared_date: line[8],
  trans_num: line[9],
  created: line[10],
  updated: line[11]
})
const validInt = val => val == '\\N' || val === '' ? null : val
const parseCheckNum = num => {
  if (!num) return null
  if (num === '') return null
  if (num === '\\N') return null
  if (/\d+/.test(num)) {
    return num.replace(/.*(\d+).*/, '$1')
  }
  return null
}
const adjustColumns = line => {
  const transDateParts = line.trans_date.split('-')
  return Object.assign({}, line, {
    amt: validInt(line.amt),
    acct_id: validInt(line.acct_id),
    cat_id: validInt(line.cat_id),
    check_num: parseCheckNum(line.check_num),
    year: validInt(transDateParts[0]),
    month: validInt(transDateParts[1]),
    day: validInt(transDateParts[2])
  })
}
const nonEmptyColumns = line => line.id !== ''
const saveRow = (db, line) => {
  try {
    db.trans.insertSync({
      id: line.id,
      year: line.year,
      month: line.month,
      day: line.day,
      trans_date: line.trans_date,
      description: line.desc,
      amt: line.amt,
      acct_id: line.acct_id,
      cat_id: line.cat_id,
      location: line.location,
      check_num: line.check_num,
      created: line.created,
      updated: line.updated
    })
  } catch(e) {
    return e
  }
}

exports.up = (db, options, done) => {
  const errs = fs.readFileSync(__dirname + '/../../../../trans.data.sql', 'utf8')
    .split('\n')
    .map(separateColumns)
    .map(nameColumns)
    .filter(nonEmptyColumns)
    .map(adjustColumns)
    .map(line => saveRow(db, line))
    .filter(err => err)
    .reduce((errs, err) => {
      errs = errs.concat([err])
      return errs
    }, [])

  db.resetTransId((err, result) => {
    if (err) errs.push(err)

    if (errs.length > 0) {
      console.error('Error in trans migration', errs) 
      done(errs)
    } else {
      console.log('Migrated transs')
      done()
    }
  })
}
