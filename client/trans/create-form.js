import { connect } from 'react-redux'
import React from 'react'
import styleable from 'react-styleable'

import * as acctActions from '../acct/actions'
import * as actions from './actions'
import AutocompleteField from '../common/components/autocomplete-field'
import * as catActions from '../cat/actions'
import css from './create-form.css'
import Field from '../common/components/field'
import * as utils from './utils'

function formatCompletion(obj) {
  return {
    value: obj.id,
    label: obj.name
  }
}

function mapStateToProps(state) {
  return {
    accts: state.acct.searchedAccts,
    acctCompletions: state.acct.searchedAccts.map(formatCompletion),
    cats: state.cat.searchedCats,
    catCompletions: state.cat.searchedCats.map(formatCompletion)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    create(trans) { dispatch(actions.create(trans)) },
    searchAccts(term) { dispatch(acctActions.search(term)) },
    searchCats(term) { dispatch(catActions.search(term)) }
  }
}

class CreateForm extends React.Component {
  constructor() {
    super()
    this.state = {
      acctSearch: '',
      catSearch: '',
      trans: {
        date: '2016-',
        desc: '',
        amt: '',
        acct: {},
        cat: ''
      }
    }
    this.handleAcctChange = this.handleAcctChange.bind(this)
    this.handleAcctSelect = this.handleAcctSelect.bind(this)
    this.handleCatChange = this.handleCatChange.bind(this)
    this.handleCatSelect = this.handleCatSelect.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleFieldChange(evt) {
    this.setState({
      trans: {
        ...this.state.trans,
        [evt.target.name]: evt.target.value
      }
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    if (utils.hasRequiredFields(this.state.trans))
      this.props.create(this.state.trans)
  }
  handleAcctSelect(evt, id) {
    evt.preventDefault()
    const acct = this.props.accts.find(a => a.id === id) || {}
    this.setState({
      trans: {
        ...this.state.trans,
        acct
      }
    })
  }
  handleAcctChange(evt) {
    const acctSearch = evt.target.value
    this.setState({
      acctSearch,
      trans: {
        ...this.state.trans,
        acct: {}
      }
    })
    this.props.searchAccts(acctSearch)
  }
  renderAcctValue() {
    return this.state.trans.acct.id
      ? this.state.trans.acct.abbrev
      : this.state.acctSearch
  }
  handleCatSelect(evt, id) {
    evt.preventDefault()
    const cat = this.props.cats.find(a => a.id === id) || {}
    this.setState({
      trans: {
        ...this.state.trans,
        cat
      }
    })
  }
  handleCatChange(evt) {
    const catSearch = evt.target.value
    this.setState({
      catSearch,
      trans: {
        ...this.state.trans,
        cat: {}
      }
    })
    this.props.searchCats(catSearch)
  }
  renderCatValue() {
    return this.state.trans.cat.id
      ? this.state.trans.cat.abbrev
      : this.state.catSearch
  }
  render() {
    return (
      <form className={this.props.css.root} onSubmit={this.props.onSubmit}>
        <div className={this.props.css.fields}>
          <Field css={{ field: this.props.css.field }}
                 errors={this.props.errors}
                 isFocused={true}
                 label="Date"
                 name="date"
                 onFieldChange={this.handleFieldChange}
                 value={this.state.trans.date} />
          <Field css={{ field: this.props.css.field }}
                 errors={this.props.errors}
                 label="Description"
                 name="desc"
                 onFieldChange={this.handleFieldChange}
                 value={this.state.trans.desc} />
          <Field css={{ field: this.props.css.field }}
                 errors={this.props.errors}
                 label="Amount"
                 name="amt"
                 onFieldChange={this.handleFieldChange}
                 value={this.state.trans.amt} />
          <AutocompleteField completions={this.props.acctCompletions}
                             css={{ field: this.props.css.field }}
                             errors={this.props.errors}
                             label="Account"
                             name="acct"
                             onFieldChange={this.handleAcctChange}
                             onSelect={this.handleAcctSelect}
                             value={this.renderAcctValue()} />
        <AutocompleteField completions={this.props.catCompletions}
                           css={{ field: this.props.css.field }}
                           errors={this.props.errors}
                           label="Category"
                           name="cat"
                           onFieldChange={this.handleCatChange}
                           onSelect={this.handleCatSelect}
                           value={this.renderCatValue()} />
        </div>
        <input className={this.props.css.btn} type="submit" value="Create" />
      </form>
    )
  }
}

export default styleable(css)(connect(mapStateToProps, mapDispatchToProps)(CreateForm))
