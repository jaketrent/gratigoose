export function formatUsd(amt) {
  return typeof amt != 'undefined'
    ? parseFloat(amt).toLocaleString('en-US', { style: 'currency', currency: 'usd', minimumFractionDigits: 2 })
    : formatUsd(0)
}

export function sumWhereAmt(objs, predicate = x => x) {
  return objs.reduce((sum, obj) => {
    return predicate(obj)
      ? sum + obj.amt
      : sum
  }, 0)
}

export function amtGtZero(obj) {
  return obj.amt > 0
}

export function amtLteZero(obj) {
  return obj.amt < 0
}

export function sumForCatType(catType, objs) {
  return objs.reduce((sum, obj) => {
    if (obj.cat.type === catType)
      sum += obj.amt
    return sum
  }, 0)
}
