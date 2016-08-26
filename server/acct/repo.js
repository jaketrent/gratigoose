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

exports.deserialize = deserialize
exports.serialize = serialize
