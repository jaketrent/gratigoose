function serialize(cat) {
  return {
    name: cat.name,
    abbrev: cat.abbrev,
    description: cat.desc,
    cat: cat.type
  }
}

function deserialize(doc, prefix) {
  return {
    id: doc.id,
    name: doc.name,
    abbrev: doc.abbrev,
    desc: doc.description,
    type: doc.type
  }
}

function find(db, id) {
  return new Promise((resolve, reject) => {
    db.cat.find({ id }, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserialize))
    })
  })
}

function findAll(db) {
  return new Promise((resolve, reject) => {
    db.cat.find({}, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserialize))
    })
  })
}

function search(db, term) {
  const fuzzyTerm = '%' + term + '%'
  return new Promise((resolve, reject) => {
    db.cat.find({
      or: [
        { 'name ilike': fuzzyTerm },
        { 'abbrev ilike': fuzzyTerm }
      ]
    }, (err, docs) => {
      if (err) return reject(err)

      resolve(docs.map(deserialize))
    })
  })
}

exports.deserialize = deserialize
exports.find = find
exports.findAll = findAll
exports.serialize = serialize
exports.search = search
