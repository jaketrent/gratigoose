export function findWhere(list, filter) {
  // TODO: handle more filters than ids
  return (list || []).filter(obj => {
    return obj.id === filter.id
  })
}
