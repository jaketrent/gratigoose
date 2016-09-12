import React from 'react'
import styleable from 'react-styleable'

import css from './header.css'
import Link from '../components/link'

function Header(props) {
  return (
    <div className={props.css.root}>
      <h1 className={props.css.title}>Gratigoose</h1>
      <nav className={props.css.nav}>
        <Link css={{ root: props.css.navLink }} href="/">Transactions</Link>
        <Link css={{ root: props.css.navLink }} href="/budget">Budget</Link>
        <Link css={{ root: props.css.navLink }} href="/tithing">Tithing</Link>
      </nav>
      {props.children}
    </div>
  )
}

export default styleable(css)(Header)
