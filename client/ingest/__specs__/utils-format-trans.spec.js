import test from 'ava'

import {
  CHOOSABLE_COLUMNS,
  DATE_COLUMN_FIELD_KEY,
  formatTrans as subject
} from '../utils'

const acct = { id: 'someId' }
const cat = { id: 'anotherId' }
const row = ['12/31/1999', 'second', 'third', 'fourth']

test('transfers attrs from row to trans', t => {
  const columns = [undefined, CHOOSABLE_COLUMNS[2], undefined, CHOOSABLE_COLUMNS[1]]
  t.deepEqual(subject({ acct, cat, columns, row }), {
    [CHOOSABLE_COLUMNS[2]]: 'second',
    [CHOOSABLE_COLUMNS[1]]: 'fourth',
    acct,
    cat
  })
})

test('ignores non-choosable column names', t => {
  const columns = ['unknownCol', undefined, undefined, CHOOSABLE_COLUMNS[1]]
  const actual = subject({ acct, cat, columns, row })
  t.truthy(typeof actual['unknownCol'] === 'undefined')
})

test('formats mm/dd/yyyy to yyyy-mm-dd', t => {
  const columns = [DATE_COLUMN_FIELD_KEY, undefined, undefined, undefined]
  const actual = subject({ acct, cat, columns, row })
  t.truthy(actual[DATE_COLUMN_FIELD_KEY] === '1999-12-31')
})
