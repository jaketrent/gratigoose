import * as dateUtils from '../common/date'
import * as objectUtils from '../common/object'

export function hasRequiredFields(trans) {
  return trans
      && trans.date && trans.date.length > 0
      && trans.desc && trans.desc.length > 0
      && !isNaN(parseFloat(trans.amt))
      && trans.acct.id
      && trans.cat.id
}

export function combineRelations(transs, { accts, cats }) {
  return transs.map(trans => ({
    ...objectUtils.pick(trans, k => !/Id$/.test(k)),
    acct: accts.find(a => a.id === trans.acctId),
    cat: cats.find(c => c.id === trans.catId)
  }))
}

export function findAll(transs, filter = x => x) {
  return transs.filter(filter)
}

export function sinceDate(date, trans) {
  date = date
    ? typeof date === 'string'
      ? Date.parse(date)
      : date.getTime() 
    : dateUtils.MIN
  const transDate = Date.parse(trans.date)
  return transDate > date
}

export function sumTranssAmtForCat(catId, transs) {
  return transs.reduce((sum, trans) => {
    if (trans.cat.id === catId)
      sum += trans.amt
    return sum
  }, 0)
}
