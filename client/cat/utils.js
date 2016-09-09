import { findWhere } from '../common/array'

export function find(cats, filter) {
  return findWhere(cats, filter)[0]
}
