const acctRepo = require('../acct/repo')
const catRepo = require('../cat/repo')
const { pickPrefix } = require('../common/repo')

function serialize(trans) {
  return {
    trans_date: trans.date,
    description: trans.desc,
    amt: trans.amt,
    acct: trans.acctId,
    cat: trans.catId
  }
}

function deserialize(doc) {
  return {
    id: doc.id,
    date: doc.trans_date,
    desc: doc.description,
    amt: parseFloat(doc.amt),
    acctId: doc.acct,
    catId: doc.cat
  }
}

function deserializeFull(doc) {
  return Object.assign(
    deserialize(pickPrefix(doc, 'trans_')),
    { acct: acctRepo.deserialize(pickPrefix(doc, 'acct_')) },
    { cat: catRepo.deserialize(pickPrefix(doc, 'cat_')) }
  )
}

function create(db, trans) {
  return new Promise((resolve, reject) => {
    db.trans.save(serialize(trans), (err, newDoc) => {
      if (err) return reject(err)

      resolve(deserialize(newDoc))
    })
  })
}

function find(db, id) {
  return new Promise((resolve, reject) => {
    db.queries.transFullFind(id, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserializeFull))
    })
  })
}

function findInYear(db, year) {
  return new Promise((resolve, reject) => {
    db.queries.transFullFindInYear(year, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserializeFull))
    })
  })
}

function findInYearMonth(db, year, month) {
  return new Promise((resolve, reject) => {
    db.queries.transFullFindInYearMonth(year, month, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserializeFull))
    })
  })
}

function findAll(db) {
  return new Promise((resolve, reject) => {
    db.queries.transFullFindAll((err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserializeFull))
    })
  })
}

exports.create = create
exports.deserialize = deserialize
exports.find = find
exports.findInYear = findInYear
exports.findInYearMonth = findInYearMonth
exports.findAll = findAll
exports.serialize = serialize
