function serializeCreate(trans) {
  const dateParts = trans.date.split('-')
  return {
    trans_date: trans.date,
    description: trans.desc,
    amt: trans.amt,
    acct_id: trans.acctId,
    cat_id: trans.catId,
    year: dateParts[0],
    month: dateParts[1],
    day: dateParts[2]
  }
}

function serialize(trans) {
  return Object.assign({
    id: trans.id,
  }, serializeCreate(trans))
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
    db.trans.save(serializeCreate(trans), (err, newDoc) => {
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
    db.trans.find({ year }, {
      order: 'trans_date desc'
    }, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserialize))
    })
  })
}

function findInYearMonth(db, year, month) {
  return new Promise((resolve, reject) => {
    db.trans.find({ year, month }, {
      order: 'trans_date desc'
    }, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserialize))
    })
  })
}

function findAll(db) {
  return new Promise((resolve, reject) => {
    db.trans.find({
      order: 'trans_date desc'
    }, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserialize))
    })
  })
}

function update(db, trans) {
  return new Promise((resolve, reject) => {
    db.trans.update(serialize(trans), (err, updatedDoc) => {
      if (err) return reject(err)

      resolve(deserialize(updatedDoc))
    })
  })
}

function destroy(db, id) {
  return new Promise((resolve, reject) => {
    db.trans.destroy({ id }, err => {
      if (err) return reject(err)

      resolve()
    })
  })
}

exports.create = create
exports.deserialize = deserialize
exports.destroy = destroy
exports.find = find
exports.findInYear = findInYear
exports.findInYearMonth = findInYearMonth
exports.findAll = findAll
exports.serialize = serialize
exports.update = update
