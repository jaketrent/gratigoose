function serialize(trans) {
  return {
    trans_date: trans.date,
    description: trans.desc,
    amt: trans.amt,
    acct_id: trans.acctId,
    cat_id: trans.catId
  }
}

function deserialize(doc) {
  return {
    id: doc.id,
    date: doc.trans_date,
    desc: doc.description,
    amt: parseFloat(doc.amt),
    acctId: doc.acct_id,
    catId: doc.cat_id
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
    db.trans.find({ id }, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserialize))
    })
  })
}

function findInYear(db, year) {
  return new Promise((resolve, reject) => {
    db.queries.transFindInYear(year, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserialize))
    })
  })
}

function findInYearMonth(db, year, month) {
  return new Promise((resolve, reject) => {
    db.queries.transFindInYearMonth(year, month, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserialize))
    })
  })
}

function findAll(db) {
  return new Promise((resolve, reject) => {
    db.trans.find((err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserialize))
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
