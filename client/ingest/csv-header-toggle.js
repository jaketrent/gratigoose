import React from 'react'

const { bool, func } = React.PropTypes

function CsvHeaderToggle(props) {
  return (
    <div>
      <label>
        <span>Includes header?</span>
        <input onChange={props.onChange}
               type="checkbox"
               checked={props.checked} />
      </label>
    </div>
  )
}

CsvHeaderToggle.propTypes = {
  checked: bool,
  onChange: func.isRequired
}

export default CsvHeaderToggle
