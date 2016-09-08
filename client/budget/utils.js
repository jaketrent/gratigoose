export function formatUsd(amt) {
  return typeof amt != 'undefined'
    ? amt.toLocaleString('en-US', { style: 'currency', currency: 'usd', minimumFractionDigits: 2 })
    : formatUsd(0)
}

function findExpectedForCat(catId, expecteds) {
  return expecteds.find(ex => ex.cat.id === catId)
}

function sumTranssAmtForCat(catId, transs) {
  return transs.reduce((sum, trans) => {
    if (trans.cat.id === catId)
      sum += trans.amt
    return sum
  }, 0)
}

export function formatBudgetLines({ cats, expecteds, transs }) {
  if (!Array.isArray(cats) || !Array.isArray(expecteds)) return []

  return cats.map(cat => {
    const expectedForCat = findExpectedForCat(cat.id, expecteds)
    const expectedAmt = expectedForCat ? expectedForCat.amt : 0
    const expectedId = expectedForCat ? expectedForCat.id : null
    const transsAmtSum = sumTranssAmtForCat(cat.id, transs)
    const diff = expectedAmt - transsAmtSum
    return {
      catId: cat.id,
      catName: cat.name,
      expectedId,
      expectedAmt,
      transsAmtSum,
      diff
    }
  })
}

export function sumForCatType(catType, objs) {
  return objs.reduce((sum, obj) => {
    if (obj.cat.type === catType)
      sum += obj.amt
    return sum
  }, 0)
}

export function sumWhereAmt(objs, predicate) {
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
