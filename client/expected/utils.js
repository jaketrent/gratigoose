import * as objectUtils from '../common/object'

export function combineRelations(expecteds, { cats }) {
  return expecteds.map(ex => ({
    ...objectUtils.pick(ex, k => !/Id$/.test(k)),
    cat: cats.find(e => e.id === ex.catId)
  }))
}

export function hasRequiredFields(expected) {
  return expected
    && expected.cat
    && expected.cat.id
    && !isNaN(parseFloat(expected.amt))
}
