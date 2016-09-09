import axios from 'axios'

import deserializeError from '../common/api/deserialize-error'

export const findInYearMonth = {
  formatUrl({ month, year }) {
    return `/api/v1/trans/year/${year}/month/${month}/budget`
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

export const createExpected = {
  formatUrl() {
    return `/api/v1/expected`
  },
  serialize({ amt, cat, month, year }) {
    return {
      amt,
      cat,
      date: `${year}-${month}-01`
    }
  },
  request(args) {
    const { api } = args
    return axios.post(api.formatUrl(), api.serialize(args))
  },
  deserializeSuccess(res) {
    return res.data.data
  },
  deserializeError
}

export const updateExpected = {
  formatUrl({ id }) {
    return `/api/v1/expected/${id}`
  },
  serialize({ id, amt }) {
    return {
      id,
      amt
    }
  },
  request(args) {
    const { api } = args
    return axios.put(api.formatUrl(args), api.serialize(args))
  },
  deserializeSuccess(res) {
    return res.data.data
  },
  deserializeError
}
