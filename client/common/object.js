export function pick(obj, filter) {
  return Object.keys(obj).reduce((acc, key) => {
    if (filter(key, obj[key]))
      acc[key] = obj[key]
    return acc
  }, {})
}
