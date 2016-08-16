// TODO: impl with massivejs

function create(trans) {
  return new Promise(resolve => resolve({ id: 3, name: trans.name }))
}

function find(id) {
  return [{ id: 1, name: 'somethingFound' }]
}

function findAll() {
  return [{ id: 1, name: 'somethingFound' }, { id: 2, name: 'somethingFoundAll' }]
}

exports.create = create
exports.find = find
exports.findAll = findAll
