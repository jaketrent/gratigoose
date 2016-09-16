import React from 'react'

const { func } = React.PropTypes

function handleChange(props, evt) {
  const file = evt.target.files[0]
  props.onSelect(evt, file)

  const reader = new FileReader()
  reader.onload = e => {
    props.onLoad(reader.result)
  }
  reader.readAsText(file, 'utf8')
}

function CsvInput(props) {
  return (
    <label>
      <span>Find CSV</span>
      <input onChange={evt => handleChange(props, evt)} type="file" />
    </label>
  )
}

CsvInput.propTypes = {
  onLoad: func.isRequired,
  onSelect: func.isRequired
}

export default CsvInput
