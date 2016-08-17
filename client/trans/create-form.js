import React from 'react'
import styleable from 'react-styleable'

import css from './create-form.css'
import Field from '../common/components/field'

class CreateForm extends React.Component {
  render() {
    return (
      <form className={this.props.css.root} onSubmit={this.props.onSubmit}>
        <div className={this.props.css.fields}>
          <Field css={{ field: this.props.css.field }}
                 errors={this.props.errors}
                 isFocused={true}
                 label="Date"
                 name="date"
                 onFieldChange={this.props.onFieldChange}
                 value={this.props.trans.date} />
          <Field css={{ field: this.props.css.field }}
                 errors={this.props.errors}
                 label="Description"
                 name="desc"
                 onFieldChange={this.props.onFieldChange}
                 value={this.props.trans.desc} />
          <Field css={{ field: this.props.css.field }}
                 errors={this.props.errors}
                 label="Amount"
                 name="amt"
                 onFieldChange={this.props.onFieldChange}
                 value={this.props.trans.amt} />
          <Field css={{ field: this.props.css.field }}
                 errors={this.props.errors}
                 label="Account"
                 name="acct"
                 onFieldChange={this.props.onFieldChange}
                 value={this.props.trans.acct} />
          <Field css={{ field: this.props.css.field }}
                 errors={this.props.errors}
                 label="Category"
                 name="cat"
                 onFieldChange={this.props.onFieldChange}
                 value={this.props.trans.cat} />
        </div>
        <input className={this.props.css.btn} type="submit" value="Create" />
      </form>
    )
  }
}

export default styleable(css)(CreateForm)
