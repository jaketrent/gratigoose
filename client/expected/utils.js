import * as catUtils from '../cat/utils'
import * as objectUtils from '../common/object'

export function combineRelations(expecteds, { cats }) {
  return expecteds.map(ex => ({
    ...objectUtils.pick(ex, k => !/Id$/.test(k)),
    cat: catUtils.find(cats, { id: ex.catId })
  }))
}
