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
  if (!Array.isArray(cats)) return []

  return cats.map(cat => {
    const expectedAmt = findExpectedForCat(cat.id, expecteds).amt
    const transsAmtSum = sumTranssAmtForCat(cat.id, transs)
    const diff = expectedAmt - transsAmtSum
    return {
      id: cat.id,
      catName: cat.name,
      expectedAmt,
      transsAmtSum,
      diff
    }
  })
}
