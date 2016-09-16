import React from 'react'

import CsvColumnOption from './csv-column-option'

const { arrayOf, string } = React.PropTypes

function CsvColumnOptions(props) {
  return (
    <div>
      {props.columns.map((c, i) => <CsvColumnOption key={i} name={c} />)}
    </div>
  )
}

CsvColumnOptions.propTypes = {
  columns: arrayOf(string)
}

export default CsvColumnOptions
