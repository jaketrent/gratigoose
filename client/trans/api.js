import axios from 'axios'

import deserializeError from '../common/api/deserialize-error'

export const create = {
  formatUrl() {
    return '/api/v1/trans'
  },
  serialize({ trans }) {
    return {
      date: trans.date,
      desc: trans.desc,
      amt: trans.amt,
      acctId: trans.acct.id,
      catId: trans.cat.id
    }
  },
  request(args) {
    const { api } = args
    return axios.post(api.formatUrl(), api.serialize(args))
  },
  deserializeSuccess(res, { trans }) {
    return { ...trans, id: res.data.data.id }
  },
  deserializeError
}

export const findAll = {
  formatUrl() {
    return '/api/v1/trans'
  },
  request(args) {
    const { api } = args
    return axios.get(api.formatUrl())
  },
  deserializeSuccess(res) {
    return res.data.data
  },
  deserializeError
}

export const findInYear = {
  formatUrl({ year }) {
    return `/api/v1/trans/year/${year}`
  },
  request(args) {
    const { api } = args
    return axios.get(api.formatUrl(args))
  },
  deserializeSuccess(res) {
    return res.data.data
  },
  deserializeError
}

export const find = {
  formatUrl({ id }) {
    return `/api/v1/trans/${id}`
  },
  request(args) {
    const { api } = args
    return axios.get(api.formatUrl(args))
  },
  deserializeSuccess(res) {
    return res.data.data[0]
  },
  deserializeError
}
