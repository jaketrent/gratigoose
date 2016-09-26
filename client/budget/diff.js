import MediaQuery from 'react-responsive'
import React from 'react'
import styleable from 'react-styleable'

import css from './diff.css'
import { formatUsd } from '../common/amt'
import media from '../common/styles/media'

const { number, string } = React.PropTypes

function Diff(props) {
  const diff = props.actual - props.expected
  return (
    <div className={props.css.root}>
      {props.title && <h3 className={props.css.title}>{props.title}</h3>}
      <div className={props.css.actual}>
        <MediaQuery query={media.smallWidth}>
          <span className={props.css.label}>act</span>
        </MediaQuery>
        <span className={props.css.val}>{formatUsd(props.actual)}</span>
      </div>
      <div className={props.css.expected}>
        <MediaQuery query={media.smallWidth}>
          <span className={props.css.label}>exp</span>
        </MediaQuery>
        <span className={props.css.val}>{formatUsd(props.expected)}</span>
      </div>
      <div className={props.css.diff}>
        <MediaQuery query={media.smallWidth}>
          <span className={props.css.label}>diff</span>
        </MediaQuery>
        <span className={props.css.val}>{formatUsd(diff)}</span>
      </div>
    </div>
  )
}

Diff.propTypes = {
  actual: number.isRequired,
  expected: number.isRequired,
  title: string
}

export default styleable(css)(Diff)
