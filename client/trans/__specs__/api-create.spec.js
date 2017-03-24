import test from 'ava'

import { create as subject } from '../api'

test('#serialize removes dollar sign from amt', t => {
  const trans = {
    acct: {},
    date: '2017-03-04',
    amt: '-$75.43',
    cat: {}
  }
  const actual = subject.serialize({ trans })
  t.truthy(actual.amt === '-75.43')
})
