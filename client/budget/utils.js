import * as transUtils from '../trans/utils'

function findExpectedForCat(catId, expecteds) {
  return expecteds.find(ex => ex.cat.id === catId)
}

export function formatBudgetLines({ cats, expecteds, transs }) {
  if (!Array.isArray(cats) || !Array.isArray(expecteds)) return []

  return cats.map(cat => {
    const expectedForCat = findExpectedForCat(cat.id, expecteds)
    const expectedAmt = expectedForCat ? expectedForCat.amt : 0
    const transsAmtSum = transUtils.sumTranssAmtForCat(cat.id, transs)
    const diff = expectedAmt - transsAmtSum
    return {
      cat,
      expected: expectedForCat,
      transsAmtSum,
      diff
    }
  })
}

