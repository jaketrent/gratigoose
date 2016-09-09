function serializeCreate(expected) {
  return {
    amt: expected.amt,
    cat_id: expected.catId,
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
    catId: doc.cat_id,
    date: doc.date
  }
}

function create(db, expected) {
  return new Promise((resolve, reject) => {
    db.expected.insert(serializeCreate(expected), (err, newDoc) => {
      if (err) return reject(err)

      resolve(deserialize(newDoc))
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
    db.queries.expectedFindInYearMonth(year, month, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserialize))
    })
  })
}

exports.create = create
exports.deserialize = deserialize
exports.findInYearMonth = findInYearMonth
exports.serialize = serialize
exports.update = update
