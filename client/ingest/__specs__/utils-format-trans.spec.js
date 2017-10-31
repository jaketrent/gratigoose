import {
  CHOOSABLE_COLUMNS,
  DATE_COLUMN_FIELD_KEY,
  formatTrans as subject
} from '../utils'

const acct = { id: 'someId' }
const cat = { id: 'anotherId' }
const row = ['12/31/1999', 'second', 'third', 'fourth']

test('transfers attrs from row to trans', () => {
  const columns = [
    undefined,
    CHOOSABLE_COLUMNS[2],
    undefined,
    CHOOSABLE_COLUMNS[1]
  ]
  expect(subject({ acct, cat, columns, row })).toEqual({
    [CHOOSABLE_COLUMNS[2]]: 'second',
    [CHOOSABLE_COLUMNS[1]]: 'fourth',
    acct,
    cat
  })
})

test('ignores non-choosable column names', () => {
  const columns = ['unknownCol', undefined, undefined, CHOOSABLE_COLUMNS[1]]
  const actual = subject({ acct, cat, columns, row })
  expect(typeof actual['unknownCol'] === 'undefined').toBeTruthy()
})

test('formats mm/dd/yyyy to yyyy-mm-dd', () => {
  const columns = [DATE_COLUMN_FIELD_KEY, undefined, undefined, undefined]
  const actual = subject({ acct, cat, columns, row })
  expect(actual[DATE_COLUMN_FIELD_KEY] === '1999-12-31').toBeTruthy()
})
