import React from 'react'

const { arrayOf, object } = React.PropTypes

function Row(props) {
  return (
    <tr>
      <td>
        {props.trans.desc}
      </td>
    </tr>
  )
}

Row.PropTypes = {
  trans: object
}

function renderRows(props) {
  return props.transs.map(t =>
    <Row key={t.id}
         trans={t} />
  )
}

function List(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {renderRows(props)}
      </tbody>
    </table>
  )
}
List.PropTypes = {
  transs: arrayOf(object)
}

export default List
