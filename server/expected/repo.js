const catRepo = require('../cat/repo')
const { pickPrefix } = require('../common/repo')

function serializeCreate(expected) {
  return {
    amt: expected.amt,
    cat: expected.cat.id,
    date: expected.date
  }
}

function serialize(expected) {
  return Object.assign({
    id: expected.id,
  }, serializeCreate(expected))
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
    db.expected.insert(serializeCreate(expected), (err, newDoc) => {
      if (err) return reject(err)

      // TODO: pickup how to deserializeFull or reassoc with full cat in the client
      resolve(Object.assign(deserialize(newDoc), expected))
    })
  })
}

function update(db, expected) {
  return new Promise((resolve, reject) => {
    db.expected.update(serialize(expected), (err, updatedDoc) => {
      if (err) return reject(err)

      resolve(deserialize(updatedDoc))
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
exports.update = update
