export const DATE_COLUMN_FIELD_KEY = 'date'
export const AMT_COLUMN_FIELD_KEY = 'amt'
export const CHOOSABLE_COLUMNS = [
  AMT_COLUMN_FIELD_KEY,
  DATE_COLUMN_FIELD_KEY,
  'desc'
]
export const INGEST_CAT_ABBREV = 'ing' // TODO: verify

const supportedDateFormat = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/

function formatDate(str) {
  if (supportedDateFormat.test(str))
    return str.replace(supportedDateFormat, '$3-$1-$2')
  else
    return str
}

export function formatTrans({ acct, cat, columns, row }) {
  return columns.reduce((trans, col, i) => {
    if (col && CHOOSABLE_COLUMNS.indexOf(col) > -1) {
      let val = row[i]
      if (col === DATE_COLUMN_FIELD_KEY)
        val = formatDate(val)
      else if (col === AMT_COLUMN_FIELD_KEY)
        val = val.replace('\$', ''),

      trans[col] = val
    }
    return trans
  }, {
    acct,
    cat
  })
}
