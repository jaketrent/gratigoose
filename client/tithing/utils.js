import { findWhere } from '../common/array'

export const TITHING_CAT_ABBREV = 'tt'
// TODO: move to dynamic flag on cat
export const NOT_INCOME_CAT_ABBREVS = [
  'tran',
  'ref',
  'bal',
  'savcar',
  'savcoll',
  'savhous',
  'savmiss',
  'savret'
]

export function findLastTithe(transs) {
  if (!Array.isArray(transs)) return null

  return [...transs]
    .reverse()
    .find(trans => trans && trans.cat && trans.cat.abbrev === TITHING_CAT_ABBREV)
}

export function isExcludedFromTithing(trans) {
  return NOT_INCOME_CAT_ABBREVS.indexOf(trans.cat.abbrev) > -1
    || (trans.desc && /refund/i.test(trans.desc))
}
