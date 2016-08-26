function serialize(acct) {
  return {
    name: acct.name,
    abbrev: acct.abbrev,
    liquidable: acct.liquidable
  }
}

function deserialize(doc, prefix) {
  return {
    id: doc.id,
    name: doc.name,
    abbrev: doc.abbrev,
    liquidable: doc.liquidable
  }
}

function find(db, id) {
  return new Promise((resolve, reject) => {
    db.acct.find(id, (err, doc) => {
      if (err) return reject(err)

      resolve([deserialize(doc)])
    })
  })
}

function findAll(db) {
  return new Promise((resolve, reject) => {
    db.acct.find({}, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserialize))
    })
  })
}

exports.deserialize = deserialize
exports.find = find
exports.findAll = findAll
exports.serialize = serialize
