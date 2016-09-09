import axios from 'axios'

import deserializeError from '../common/api/deserialize-error'

export const search = {
  formatUrl({ term }) {
    return `/api/v1/acct?term=${encodeURIComponent(term)}`
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

export const findAll = {
  formatUrl() {
    return '/api/v1/acct'
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
