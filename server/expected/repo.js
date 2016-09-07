const catRepo = require('../cat/repo')
const { pickPrefix } = require('../common/repo')

function serialize(expected) {
  return {
    amt: expected.amt,
    cat: expected.catId
  }
}

function deserialize(doc) {
  return {
    id: doc.id,

    amt: parseFloat(doc.amt),
    catId: doc.cat,
    date: doc.date
  }
}

function deserializeFull(doc) {
  return Object.assign(
    deserialize(pickPrefix(doc, 'expected_')),
    { cat: catRepo.deserialize(pickPrefix(doc, 'cat_')) }
  )
}

function create(db, expected) {
  return new Promise((resolve, reject) => {
    db.expected.save(serialize(expected), (err, newDoc) => {
      if (err) return reject(err)

      resolve(deserialize(newDoc))
    })
  })
}

function findInYearMonth(db, year, month) {
  return new Promise((resolve, reject) => {
    db.queries.expectedFullFindInYearMonth(year, month, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserializeFull))
    })
  })
}

exports.create = create
exports.deserialize = deserialize
exports.findInYearMonth = findInYearMonth
exports.serialize = serialize
