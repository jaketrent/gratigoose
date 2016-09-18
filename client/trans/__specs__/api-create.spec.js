import test from 'ava'

import { create as subject } from '../api'

test('#serialize removes dollar sign from amt', t => {
  const trans = {
    acct: {},
    amt: '-$75.43',
    cat: {}
  }
  const actual = subject.serialize({ trans })
  t.truthy(actual.amt === '-75.43')
})
