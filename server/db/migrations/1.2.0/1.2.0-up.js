const fs = require('fs')

const separateColumns = line => line.split('\t')
const nameColumns = line => ({
  id: line[0],
  name: line[1],
  abbrev: line[2],
  desc: line[3],
  type: line[4],
  created: line[5],
  updated: line[6]
})
const adjustColumns = line => (Object.assign({}, line, {
  type: line.type ? line.type.toLowerCase() : line.type
}))
const nonEmptyColumns = line => line.id !== ''
const saveRow = (db, line) => {
  try {
    db.cat.insertSync({
      id: line.id,
      name: line.name,
      abbrev: line.abbrev,
      description: line.desc,
      type: line.type,
      created: line.created,
      updated: line.updated
    })
  } catch(e) {
    return e
  }
}

exports.up = (db, options, done) => {
  const errs = fs.readFileSync(__dirname + '/../../../../cats.data.sql', 'utf8')
    .split('\n')
    .map(separateColumns)
    .map(nameColumns)
    .map(adjustColumns)
    .filter(nonEmptyColumns)
    .map(line => saveRow(db, line))
    .filter(err => err)
    .reduce((errs, err) => {
      errs = errs.concat([err])
      return errs
    }, [])

  db.resetCatId((err, result) => {
    if (err) errs.push(err)

    if (errs.length > 0) {
      console.error('Error in cat migration', errs) 
      done(errs)
    } else {
      console.log('Migrated cats')
      done()
    }
  })
}
