import * as objectUtils from '../common/object'

export function combineRelations(expecteds, { cats }) {
  return expecteds.map(ex => ({
    ...objectUtils.pick(ex, k => !/Id$/.test(k)),
    cat: cats.find(e => e.id === ex.catId)
  }))
}
