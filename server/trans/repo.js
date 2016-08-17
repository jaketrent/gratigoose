// TODO: impl with massivejs

function create(trans) {
  return Promise.resolve({
    id: 3,
    date: trans.date,
    desc: trans.desc,
    amt: trans.amt,
    acct: trans.acct,
    cat: trans.cat
  })
}

const fakes = [{
  id: 1,
  date: '2016-01-02',
  desc: 'somethingFound',
  amt: 12.12,
  acct: 'mach',
  cat: 'gft'
}, {
  id: 2,
  date: '2016-04-01',
  desc: 'somethingElse Found',
  amt: 124.13,
  acct: 'mas',
  cat: 'el'
}]

function find(id) {
  return [fakes[0]]
}

function findAll() {
  return fakes
}

exports.create = create
exports.find = find
exports.findAll = findAll
