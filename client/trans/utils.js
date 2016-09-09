import * as acctUtils from '../acct/utils'
import * as catUtils from '../cat/utils'
import * as objectUtils from '../common/object'

export function hasRequiredFields(trans) {
  return trans
      && trans.date && trans.date.length > 0
      && trans.desc && trans.desc.length > 0
      && trans.amt && trans.amt.length > 0
      && trans.acct.id
      && trans.cat.id
}

export function combineRelations(transs, { accts, cats }) {
  return transs.map(trans => ({
    ...objectUtils.pick(trans, k => !/Id$/.test(k)),
    acct: acctUtils.find(accts, { id: trans.acctId }),
    cat: catUtils.find(cats, { id: trans.catId })
  }))
}
