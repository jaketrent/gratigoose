import axios from 'axios'

import deserializeError from '../common/api/deserialize-error'

const frags = {
  trans: {
    view: `
      id,
      date,
      desc,
      amt,
      acct {
        id,
        abbrev
      },
      cat {
        id,
        abbrev
      }
    `
  }
}

export const create = {
  formatUrl() {
    return `/api/v1/graphql`
  },
  serialize({ trans }) {
    const query = `mutation newTrans {
      createTrans(trans: {
        date: "${trans.date}",
        desc: "${trans.desc}",
        amt: ${trans.amt},
        acctId: ${trans.acct.id}
        catId: ${trans.cat.id}
      }) {
        id
      }
    }`
    return { query }
  },
  request(args) {
    const { api } = args
    return axios.post(api.formatUrl(), api.serialize(args))
  },
  deserializeSuccess(res, { trans }) {
    return { ...trans, id: res.data.id }
  },
  deserializeError
}

export const findAll = {
  formatUrl() {
    const query = `
      {
        trans {
          ${frags.trans.view}
        }
      }
    `
    return `/api/v1/graphql?query=${encodeURIComponent(query)}`
  },
  request(args) {
    const { api } = args
    return axios.get(api.formatUrl())
  },
  deserializeSuccess(res) {
    return res.data.data.trans
  },
  deserializeError
}

export const find = {
  formatUrl({ id }) {
    const query = `
      {
        trans(id: ${id}) {
          ${frags.trans.view}
        }
      }
    `
    return `/api/v1/graphql?query=${encodeURIComponent(query)}`
  },
  request(args) {
    const { api } = args
    return axios.get(api.formatUrl(args))
  },
  deserializeSuccess(res) {
    return res.data.data.trans[0]
  },
  deserializeError
}
