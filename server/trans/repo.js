const acctRepo = require('../acct/repo')
const catRepo = require('../cat/repo')
const { pickPrefix } = require('../common/repo')

function serialize(trans) {
  return {
    trans_date: trans.date,
    description: trans.desc,
    amt: trans.amt,
    acct: trans.acct,
    cat: trans.cat
  }
}

function deserialize(doc) {
  return {
    id: doc.id,
    date: doc.trans_date,
    desc: doc.description,
    amt: doc.amt,
    acct: doc.acct,
    cat: doc.cat
  }
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
    db.trans.findFull(id, (err, doc) => {
      if (err) return reject(err)

      resolve([deserialize(doc)])
    })
  })
}

function findAll(db) {
  return new Promise((resolve, reject) => {
    db.queries.transFullFindAll((err, docs) => {
      if (err) return reject(err)

      const des = docs.map(doc => {
        return Object.assign(
          deserialize(pickPrefix(doc, 'trans_')),
          { acct: acctRepo.deserialize(pickPrefix(doc, 'acct_')) },
          { cat: catRepo.deserialize(pickPrefix(doc, 'cat_')) }
        )
      })
      resolve(des)
    })
  })
}

exports.create = create
exports.deserialize = deserialize
exports.find = find
exports.findAll = findAll
exports.serialize = serialize
