import React from 'react'
import styleable from 'react-styleable'

import css from './header.css'
import Link from '../components/link'

const { node } = React.PropTypes

function Header(props) {
  return (
    <div className={props.css.root}>
      <Link href="/" css={{ root: props.css.img }}>Gratigoose</Link>
      {props.title}
      <nav className={props.css.nav}>
        <Link css={{ root: props.css.navLink }} href="/">Transactions</Link>
        <Link css={{ root: props.css.navLink }} href="/budget">Budget</Link>
        <Link css={{ root: props.css.navLink }} href="/tithing">Tithing</Link>
        <Link css={{ root: props.css.navLink }} href="/ingest">Ingest</Link>
      </nav>
      {props.children}
    </div>
  )
}
Header.propTypes = {
  title: node
}

export default styleable(css)(Header)
