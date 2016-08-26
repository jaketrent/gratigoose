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

exports.deserialize = deserialize
exports.serialize = serialize
