import { findWhere } from '../common/array'

export const TITHING_CAT_ABBREV = 'tt'

export function findLastTithe(transs) {
  if (!Array.isArray(transs)) return null

  return [...transs]
    .reverse()
    .find(trans => trans && trans.cat && trans.cat.abbrev === TITHING_CAT_ABBREV)
}
