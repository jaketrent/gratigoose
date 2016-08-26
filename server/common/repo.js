function pickPrefix(doc, prefix) {
  if (!prefix) return doc
  
  const regex = new RegExp('^(' + prefix + ')(.*)')
  return Object.keys(doc).reduce((acc, key) => {
    if (regex.test(key))
      acc[key.replace(regex, '$2')] = doc[key]
    return acc
  }, {})
}

exports.pickPrefix = pickPrefix
